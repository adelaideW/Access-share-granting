/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import {
  DEMO_BULK_DIRECTORY,
  buildBulkDirectoryFromFullNames,
  detectBulkIdentifierType,
  findMatchedPerson,
  newBulkImportRowId,
} from '../lib/bulk.ts';

describe('detectBulkIdentifierType', () => {
  it('classifies email, employee_id, and name', () => {
    expect(detectBulkIdentifierType('a@b.co')).toBe('email');
    expect(detectBulkIdentifierType('E1001')).toBe('employee_id');
    expect(detectBulkIdentifierType('12345')).toBe('employee_id');
    expect(detectBulkIdentifierType('Harry Porter')).toBe('name');
  });
});

describe('findMatchedPerson', () => {
  const tiny = buildBulkDirectoryFromFullNames(['Harry Porter', 'Avery Lee']);

  it('matches by exact email and employee id', () => {
    expect(findMatchedPerson(tiny, 'harry.porter@company.com', 'email')?.fullName).toBe('Harry Porter');
    expect(findMatchedPerson(tiny, 'E1001', 'employee_id')?.fullName).toBe('Harry Porter');
    expect(findMatchedPerson(tiny, 'E1002', 'employee_id')?.fullName).toBe('Avery Lee');
  });

  it('matches by exact and partial name', () => {
    expect(findMatchedPerson(tiny, 'Harry Porter', 'name')?.fullName).toBe('Harry Porter');
    expect(findMatchedPerson(tiny, 'harry', 'name')?.fullName).toBe('Harry Porter');
  });

  it('returns null when unknown', () => {
    expect(findMatchedPerson(tiny, 'nobody@company.com', 'email')).toBeNull();
    expect(findMatchedPerson(tiny, 'E9999', 'employee_id')).toBeNull();
    expect(findMatchedPerson(tiny, 'Zaphod Beeblebrox', 'name')).toBeNull();
  });

  it('works against the demo directory used by the app', () => {
    expect(findMatchedPerson(DEMO_BULK_DIRECTORY, 'harry.porter@company.com', 'email')?.id).toBe('emp-1001');
  });
});

describe('newBulkImportRowId', () => {
  it('returns unique ids in a tight loop (regression for Date.now collisions)', () => {
    const set = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      set.add(newBulkImportRowId());
    }
    expect(set.size).toBe(1000);
  });
});
