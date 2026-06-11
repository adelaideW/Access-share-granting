/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { findMatchedPerson, type BulkDirectoryPerson } from './bulk.ts';
import { getAllSupergroupOptionLabels, isSupergroupOption } from './supergroups.ts';

export const INPUT_MENU_ITEM_CLASS =
  'outline-none focus:outline-none focus-visible:outline-none hover:bg-gray-50 transition-colors';

export const INPUT_SUGGESTIONS = [
  { label: 'Team', desc: 'Person(s) that share one or more teams in common with employee' },
  { label: 'Peers', desc: 'Everyone (except the employee) who reports to the same manager' },
  { label: 'Reports', desc: 'Everyone that reports directly to the employee' },
  { label: 'All reports', desc: 'Everyone that reports up through the employee' },
  { label: 'Department', desc: 'Person(s) that share department in common with employee' },
  { label: 'Location', desc: 'Person(s) that share the same work location as employee' },
  { label: 'Entity', desc: 'Everyone in the same legal entity as the employee' },
  {
    label: 'Title',
    desc: 'Nearest manager up the reporting chain with the specified title',
    hasMore: true,
  },
  {
    label: 'Level',
    desc: 'Nearest manager up the reporting chain at or above the specified level',
    hasMore: true,
  },
  {
    label: 'Business partner',
    desc: "The employee's business partner(s) of the...",
    hasMore: true,
  },
  {
    label: 'Client group',
    desc: "The business partner's supported employees for the specified business partner group",
    hasMore: true,
  },
] as const;

export const INPUT_EMPLOYEE_OPTIONS = [
  'Manager',
  'Hired by',
  'Work location → Employees in location',
  'Termination info → Direct reports new manager',
  'Termination info → Termination initiator',
  'Headcount Allocation → Associated employee',
  'Headcount Allocation → Backfill for employee',
  'Application → Referred by',
  'Application → Employee candidate',
  'Application → Application recruiter',
  'Application → Sourcing credit',
  'Application → Added by',
  'Candidate application → Referred by',
  'Current Long-term leave → Processed by',
] as const;

const SUGGESTION_LABELS = new Set<string>(INPUT_SUGGESTIONS.map((option) => option.label));
const EMPLOYEE_OPTION_LABELS = new Set<string>(INPUT_EMPLOYEE_OPTIONS);

let cachedGroupLabels: string[] | null = null;

export function getAllSelectableGroupLabels(): string[] {
  if (cachedGroupLabels) return cachedGroupLabels;
  cachedGroupLabels = Array.from(
    new Set([
      ...INPUT_SUGGESTIONS.map((option) => option.label),
      ...INPUT_EMPLOYEE_OPTIONS,
      ...getAllSupergroupOptionLabels(),
    ])
  );
  return cachedGroupLabels;
}

export function matchesInputQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

type SearchablePerson = {
  id: string;
  names: string[];
  title?: string;
  department?: string;
  avatar?: string;
};

export function isKnownIndividual(
  name: string,
  directoryPeople: SearchablePerson[],
  bulkDirectory: BulkDirectoryPerson[]
): boolean {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return false;
  if (directoryPeople.some((person) => person.names[0].toLowerCase() === normalized)) {
    return true;
  }
  return !!findMatchedPerson(bulkDirectory, name, 'name');
}

export function isGroupSelection(
  name: string,
  directoryPeople: SearchablePerson[],
  bulkDirectory: BulkDirectoryPerson[]
): boolean {
  if (isKnownIndividual(name, directoryPeople, bulkDirectory)) return false;
  if (isSupergroupOption(name)) return true;
  if (SUGGESTION_LABELS.has(name)) return true;
  if (EMPLOYEE_OPTION_LABELS.has(name)) return true;
  return false;
}

export function filterInputMenuSearch(
  query: string,
  searchablePeople: SearchablePerson[],
  bulkDirectory: BulkDirectoryPerson[]
): { users: SearchablePerson[]; groups: string[] } {
  const trimmed = query.trim();
  if (!trimmed) return { users: [], groups: [] };

  const users: SearchablePerson[] = [];
  const seenUsers = new Set<string>();

  for (const person of searchablePeople) {
    const name = person.names[0];
    const matches =
      matchesInputQuery(name, trimmed) ||
      matchesInputQuery(person.title ?? '', trimmed) ||
      matchesInputQuery(person.department ?? '', trimmed);
    if (!matches) continue;
    const key = name.toLowerCase();
    if (seenUsers.has(key)) continue;
    seenUsers.add(key);
    users.push(person);
  }

  for (const entry of bulkDirectory) {
    if (!matchesInputQuery(entry.fullName, trimmed)) continue;
    const key = entry.fullName.toLowerCase();
    if (seenUsers.has(key)) continue;
    seenUsers.add(key);
    users.push({
      id: entry.id,
      names: [entry.fullName],
      title: undefined,
      department: undefined,
      avatar: entry.avatar,
    });
  }

  const groups = getAllSelectableGroupLabels().filter((label) => matchesInputQuery(label, trimmed));

  return { users, groups };
}
