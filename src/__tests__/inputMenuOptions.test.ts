import { describe, expect, it } from 'vitest';
import { DEMO_BULK_DIRECTORY } from '../lib/bulk.ts';
import { filterInputMenuSearch, isGroupSelection } from '../lib/inputMenuOptions.ts';

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

  it('treats supergroup labels as groups, not individuals', () => {
    expect(
      isGroupSelection('Engineering Department', searchablePeople, DEMO_BULK_DIRECTORY)
    ).toBe(true);
    expect(isGroupSelection('Sarah Johnson', searchablePeople, DEMO_BULK_DIRECTORY)).toBe(false);
  });
});
