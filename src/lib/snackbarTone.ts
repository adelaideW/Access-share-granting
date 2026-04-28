/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SnackbarTone = 'success' | 'warning' | 'info' | 'error';

export function inferToastTone(message: string): SnackbarTone {
  const normalized = message.toLowerCase();
  if (/(could not|failed|error|invalid|unable)/.test(normalized)) return 'error';
  if (/(already|duplicate|no |cannot|warning|not found)/.test(normalized)) return 'warning';
  if (/(copied|saved|complete|added|selected|updated|sent|matched)/.test(normalized)) return 'success';
  return 'info';
}
