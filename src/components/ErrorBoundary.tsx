/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  declare readonly props: Readonly<Props>;
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 p-6 font-sans text-center">
          <h1 className="text-xl font-semibold text-gray-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-gray-600">
            The app hit an unexpected error. Try refreshing the page. If it keeps happening, share this with your team.
          </p>
          {this.state.error?.message ? (
            <pre className="max-w-lg overflow-auto rounded-lg bg-white p-3 text-left text-xs text-red-800 shadow">
              {this.state.error.message}
            </pre>
          ) : null}
          <button
            type="button"
            className="rounded-lg bg-[#7A005D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#60003D]"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
