/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BulkIdentifierType = 'email' | 'employee_id' | 'name';

export type BulkDirectoryPerson = {
  id: string;
  fullName: string;
  email: string;
  employeeId: string;
  avatar: string;
};

export const DEMO_BULK_FULL_NAMES = [
  'Harry Porter',
  'Avery Lee',
  'Noah Kim',
  'Riley Patel',
  'Jordan Smith',
  'Taylor Nguyen',
  'Skyler Brown',
  'Casey Johnson',
  'Morgan Davis',
  'Elliot Turner',
  'Parker Hall',
  'Logan Gray',
  'Dakota Young',
  'Cameron Rivera',
  'Blake Collins',
  'Rowan Hughes',
  'Quinn Foster',
  'Jamie Brooks',
  'Alex Morgan',
  'Sam Carter',
  'Chris Bennett',
  'Drew Adams',
  'Robin Flores',
  'Charlie Ward',
  'Finley James',
  'Emerson Cook',
  'Hayden Bell',
  'Kai Watson',
  'Sage Ross',
  'Ari Cooper',
  'Reese Richardson',
  'Micah Sanders',
  'Kendall Price',
  'Payton Kelly',
  'Shawn Patterson',
  'Bailey Murphy',
  'Corey Barnes',
  'Jules Diaz',
  'River Henderson',
  'Peyton Stewart',
  'Marley Jenkins',
  'Toby Perry',
  'Sidney Powell',
  'Phoenix Long',
  'Remy Hughes',
  'Nico Coleman',
  'Lane Simmons',
  'Dylan Fisher',
  'Harper Griffin',
  'Parker Woods',
  'Rory Bryant',
  'Emery Russell',
  'Dakota Coleman',
  'Robin Hayes',
  'Jaden Foster',
] as const;

export function buildBulkDirectoryFromFullNames(fullNames: readonly string[]): BulkDirectoryPerson[] {
  return fullNames.map((fullName, index) => {
    const normalized = fullName.toLowerCase().replace(/\s+/g, '.');
    const employeeId = `E${(1001 + index).toString().padStart(4, '0')}`;
    return {
      id: `emp-${1001 + index}`,
      fullName,
      email: `${normalized}@company.com`,
      employeeId,
      avatar: `https://i.pravatar.cc/120?u=${encodeURIComponent(fullName)}`,
    };
  });
}

/** Stable module-level directory for the prototype UI (same reference every render). */
export const DEMO_BULK_DIRECTORY: BulkDirectoryPerson[] = buildBulkDirectoryFromFullNames(DEMO_BULK_FULL_NAMES);

/** Ids must be unique per row; `Date.now()` alone collides under rapid repeats and breaks React keys. */
export function newBulkImportRowId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `bulk-${crypto.randomUUID()}`;
  }
  return `bulk-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function detectBulkIdentifierType(value: string): BulkIdentifierType {
  const trimmed = value.trim();
  if (/\S+@\S+\.\S+/.test(trimmed)) return 'email';
  if (/^[a-z]{0,3}\d{3,}$/i.test(trimmed) || /^\d{4,}$/.test(trimmed)) return 'employee_id';
  return 'name';
}

export function findMatchedPerson(
  bulkDirectory: BulkDirectoryPerson[],
  value: string,
  identifierType: BulkIdentifierType
): BulkDirectoryPerson | null {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  if (identifierType === 'email') {
    return bulkDirectory.find((p) => p.email.toLowerCase() === normalized) ?? null;
  }
  if (identifierType === 'employee_id') {
    return bulkDirectory.find((p) => p.employeeId.toLowerCase() === normalized) ?? null;
  }
  return (
    bulkDirectory.find((p) => p.fullName.toLowerCase() === normalized) ??
    bulkDirectory.find((p) => p.fullName.toLowerCase().includes(normalized)) ??
    null
  );
}
