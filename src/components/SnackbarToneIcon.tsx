/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertCircle, Check, Info } from 'lucide-react';
import type { SnackbarTone } from '../lib/snackbarTone.ts';

export function SnackbarToneIcon({ tone, className }: { tone: SnackbarTone; className?: string }) {
  switch (tone) {
    case 'success':
      return <Check className={className} />;
    case 'warning':
      return <AlertCircle className={className} />;
    case 'error':
      return <AlertCircle className={className} />;
    case 'info':
    default:
      return <Info className={className} />;
  }
}
