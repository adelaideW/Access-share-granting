import { describe, expect, it } from 'vitest';
import {
  getSupergroupMembers,
  isSupergroupOption,
  SUPERGROUP_CATEGORIES,
} from '../lib/supergroups.ts';

describe('supergroups', () => {
  it('includes all screenshot category labels', () => {
    const labels = SUPERGROUP_CATEGORIES.map((category) => category.label);
    expect(labels).toContain('All... (Managers, Employees, etc.)');
    expect(labels).toContain('Admins');
    expect(labels).toContain('Department');
    expect(labels).toContain('State');
    expect(labels).toContain('Country');
    expect(labels).toContain('Work Location');
    expect(labels).toContain('Entity');
    expect(labels).toContain('Teams');
    expect(labels).toContain('Employment Types');
  });

  it('expands engineering department to individual members', () => {
    expect(isSupergroupOption('Engineering Department')).toBe(true);
    const members = getSupergroupMembers('Engineering Department');
    expect(members.length).toBeGreaterThan(1);
    expect(members.every((member) => member.name && member.title)).toBe(true);
  });

  it('expands all everyone to the full demo roster', () => {
    const members = getSupergroupMembers('All - Everyone');
    expect(members.length).toBeGreaterThanOrEqual(10);
  });
});
