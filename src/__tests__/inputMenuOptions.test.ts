import { describe, expect, it } from 'vitest';
import { DEMO_BULK_DIRECTORY } from '../lib/bulk.ts';
import {
  filterInputMenuSearch,
  getDisplayedSuggestions,
  isGroupSelection,
} from '../lib/inputMenuOptions.ts';

const searchablePeople = [
  {
    id: 's1',
    names: ['Sarah Johnson'],
    title: 'Product Manager',
    department: 'Product',
  },
];

describe('inputMenuOptions', () => {
  it('returns matching users and groups for a query', () => {
    const result = filterInputMenuSearch('sar', searchablePeople, DEMO_BULK_DIRECTORY);
    expect(result.users.some((user) => user.names[0] === 'Sarah Johnson')).toBe(true);
    const groupResult = filterInputMenuSearch('engineering', searchablePeople, DEMO_BULK_DIRECTORY);
    expect(groupResult.groups.some((group) => group.includes('Engineering'))).toBe(true);
  });

  it('caps suggestions at three with recents first', () => {
    const labels = getDisplayedSuggestions(
      ['Engineering Department', 'Team', 'All - Managers', 'Peers'],
      3
    );
    expect(labels).toHaveLength(3);
    expect(labels[0]).toBe('Engineering Department');
    expect(labels[1]).toBe('Team');
    expect(labels[2]).toBe('All - Managers');
  });

  it('treats supergroup labels as groups, not individuals', () => {
    expect(
      isGroupSelection('Engineering Department', searchablePeople, DEMO_BULK_DIRECTORY)
    ).toBe(true);
    expect(isGroupSelection('Sarah Johnson', searchablePeople, DEMO_BULK_DIRECTORY)).toBe(false);
  });
});
