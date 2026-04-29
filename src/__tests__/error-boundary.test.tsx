/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary.tsx';

function Bomb() {
  throw new Error('unit-test-boom');
}

function Parent() {
  const [go, setGo] = useState(false);
  if (go) return <Bomb />;
  return (
    <button type="button" onClick={() => setGo(true)}>
      trigger-crash
    </button>
  );
}

describe('ErrorBoundary', () => {
  it('renders fallback UI when a child throws', async () => {
    const user = userEvent.setup();
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Parent />
      </ErrorBoundary>,
    );

    await user.click(screen.getByRole('button', {name: 'trigger-crash'}));

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/unit-test-boom/)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Reload/i})).toBeInTheDocument();

    err.mockRestore();
  });

  it('keeps sibling shell visible outside the subtree that threw', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});

    function ImmediateBomb() {
      throw new Error('immediate-boom');
    }

    render(
      <>
        <div data-testid="app-shell">shell</div>
        <ErrorBoundary>
          <ImmediateBomb />
        </ErrorBoundary>
      </>,
    );

    expect(screen.getByTestId('app-shell')).toHaveTextContent('shell');
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/immediate-boom/)).toBeInTheDocument();

    err.mockRestore();
  });
});
