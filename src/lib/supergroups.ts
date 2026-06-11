/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupergroupMember = {
  name: string;
  title: string;
  department: string;
  avatar: string;
};

export type SupergroupCategory = {
  id: string;
  label: string;
  options: string[];
};

type DemoEmployee = SupergroupMember & {
  subDepartment?: string;
  location: string;
  stateGroup: string;
  country: string;
  entity: string;
  team?: string;
  employmentType: string;
  isAdmin: boolean;
  adminLevel?: 'full' | 'super';
  isManager: boolean;
  isContractor: boolean;
  flsaExempt: boolean;
  isFullTime: boolean;
  isHourly: boolean;
  isPartTime: boolean;
  isTemporary: boolean;
  isRemote: boolean;
};

function avatarFor(name: string): string {
  return `https://i.pravatar.cc/120?u=${encodeURIComponent(name)}`;
}

const DEMO_EMPLOYEES: DemoEmployee[] = [
  {
    name: 'Avery Lee',
    title: 'Backend Engineer',
    department: 'Engineering Department',
    subDepartment: 'Engineering > Backend Department',
    location: 'San Francisco office Office',
    stateGroup: 'California, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Operations Team',
    employmentType: 'Salaried, full-time',
    isAdmin: false,
    isManager: true,
    isContractor: false,
    flsaExempt: true,
    isFullTime: true,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Avery Lee'),
  },
  {
    name: 'Noah Kim',
    title: 'Frontend Engineer',
    department: 'Engineering Department',
    subDepartment: 'Engineering > Frontend Department',
    location: 'Mountain View office Office',
    stateGroup: 'California, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Support Team',
    employmentType: 'Salaried, full-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: true,
    isFullTime: true,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Noah Kim'),
  },
  {
    name: 'Riley Patel',
    title: 'Infra Engineer',
    department: 'Engineering Department',
    subDepartment: 'Engineering > Infra Department',
    location: 'San Jose office Office',
    stateGroup: 'California, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Events Team',
    employmentType: 'Hourly, full-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: false,
    isFullTime: true,
    isHourly: true,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Riley Patel'),
  },
  {
    name: 'Jordan Smith',
    title: 'Customer Success Manager',
    department: 'Customer Support Department',
    subDepartment: 'Customer Support > Customer Success Department',
    location: 'Chicago office Office',
    stateGroup: 'Colorado, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Support Team',
    employmentType: 'Salaried, full-time',
    isAdmin: true,
    adminLevel: 'full',
    isManager: true,
    isContractor: false,
    flsaExempt: true,
    isFullTime: true,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Jordan Smith'),
  },
  {
    name: 'Taylor Nguyen',
    title: 'Velocity Specialist',
    department: 'Customer Support Department',
    subDepartment: 'Customer Support > Velocity Department',
    location: 'US default address Office',
    stateGroup: 'Alabama, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Operations Team',
    employmentType: 'Hourly, part-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: false,
    isFullTime: false,
    isHourly: true,
    isPartTime: true,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Taylor Nguyen'),
  },
  {
    name: 'Skyler Brown',
    title: 'Enterprise AE',
    department: 'Sales Department',
    subDepartment: 'Sales > Enterprise Department',
    location: 'San Francisco Office 2 Office',
    stateGroup: 'California, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Softball Team Team',
    employmentType: 'Salaried, full-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: true,
    isFullTime: true,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Skyler Brown'),
  },
  {
    name: 'Casey Johnson',
    title: 'Mid-market AE',
    department: 'Sales Department',
    subDepartment: 'Sales > Mid-market Department',
    location: 'Mountain View office Office',
    stateGroup: 'BC, CA Locations',
    country: 'Canada Locations',
    entity: 'Entity: ABC Canada Inc.',
    team: 'Events Team',
    employmentType: 'Contractor / 1099',
    isAdmin: false,
    isManager: false,
    isContractor: true,
    flsaExempt: false,
    isFullTime: false,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: true,
    avatar: avatarFor('Casey Johnson'),
  },
  {
    name: 'Morgan Davis',
    title: 'SMB AE',
    department: 'Sales Department',
    subDepartment: 'Sales > SMB Department',
    location: 'India office Office',
    stateGroup: 'AB, CA Locations',
    country: 'India Locations',
    entity: 'Entity: ABC India Inc.',
    team: 'Support Team',
    employmentType: 'Contractor',
    isAdmin: false,
    isManager: false,
    isContractor: true,
    flsaExempt: false,
    isFullTime: false,
    isHourly: true,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Morgan Davis'),
  },
  {
    name: 'Elliot Turner',
    title: 'Sales Engineer',
    department: 'Sales Department',
    subDepartment: 'Sales > Sales Engineering Department',
    location: 'UK Headquarters Office',
    stateGroup: 'BIR, GB Locations',
    country: 'United Kingdom Locations',
    entity: 'Entity: Wright, Davis and Price',
    team: 'Operations Team',
    employmentType: 'Salaried, part-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: true,
    isFullTime: false,
    isHourly: false,
    isPartTime: true,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Elliot Turner'),
  },
  {
    name: 'Parker Hall',
    title: 'Finance Analyst',
    department: 'Finance Department',
    location: 'San Francisco office Office',
    stateGroup: 'California, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    employmentType: 'Salaried, full-time',
    isAdmin: true,
    adminLevel: 'super',
    isManager: true,
    isContractor: false,
    flsaExempt: true,
    isFullTime: true,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Parker Hall'),
  },
  {
    name: 'Logan Gray',
    title: 'HR Partner',
    department: 'Human Resources Department',
    location: 'Chicago office Office',
    stateGroup: 'Colorado, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    employmentType: 'Full time',
    isAdmin: true,
    adminLevel: 'super',
    isManager: false,
    isContractor: false,
    flsaExempt: true,
    isFullTime: true,
    isHourly: false,
    isPartTime: false,
    isTemporary: false,
    isRemote: false,
    avatar: avatarFor('Logan Gray'),
  },
  {
    name: 'Dakota Young',
    title: 'IT Specialist',
    department: 'Information Technology Department',
    location: 'US default address Office',
    stateGroup: 'Alabama, US Locations',
    country: 'United States Locations',
    entity: 'Entity: Wright, Davis and Price',
    employmentType: 'Hourly, full-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: false,
    isFullTime: true,
    isHourly: true,
    isPartTime: false,
    isTemporary: false,
    isRemote: true,
    avatar: avatarFor('Dakota Young'),
  },
  {
    name: 'Cameron Rivera',
    title: 'Marketing Manager',
    department: 'Marketing Department',
    location: 'Mountain View office Office',
    stateGroup: 'California, US Locations',
    country: 'United States Locations',
    entity: 'Entity: ABC Canada Inc.',
    employmentType: 'Intern',
    isAdmin: false,
    isManager: true,
    isContractor: false,
    flsaExempt: false,
    isFullTime: false,
    isHourly: true,
    isPartTime: true,
    isTemporary: true,
    isRemote: false,
    avatar: avatarFor('Cameron Rivera'),
  },
  {
    name: 'Blake Collins',
    title: 'Contract Designer',
    department: 'Marketing Department',
    location: 'San Jose office Office',
    stateGroup: 'BC, CA Locations',
    country: 'Canada Locations',
    entity: 'Entity: ABC Canada Inc.',
    employmentType: 'Temporary / Intern',
    isAdmin: false,
    isManager: false,
    isContractor: true,
    flsaExempt: false,
    isFullTime: false,
    isHourly: true,
    isPartTime: false,
    isTemporary: true,
    isRemote: false,
    avatar: avatarFor('Blake Collins'),
  },
  {
    name: 'Rowan Hughes',
    title: 'Remote Coordinator',
    department: 'Operations Team',
    location: 'All Remote Employees',
    stateGroup: 'AB, CA Locations',
    country: 'Canada Locations',
    entity: 'Entity: ABC India Inc.',
    team: 'Operations Team',
    employmentType: 'Hourly, part-time',
    isAdmin: false,
    isManager: false,
    isContractor: false,
    flsaExempt: false,
    isFullTime: false,
    isHourly: true,
    isPartTime: true,
    isTemporary: false,
    isRemote: true,
    avatar: avatarFor('Rowan Hughes'),
  },
];

export const SUPERGROUP_CATEGORIES: SupergroupCategory[] = [
  {
    id: 'all',
    label: 'All... (Managers, Employees, etc.)',
    options: [
      'All - Contractors',
      'All - Employees',
      'All - Everyone',
      'All - FLSA Exempt Employees',
      'All - FLSA Non-Exempt Employees',
      'All - Full-Time, Hourly Employees',
      'All - Full-Time, Salaried Employees',
      'All - Hourly Contractors',
      'All - Managers',
      'All - Part-Time, Hourly Employees',
      'All - Part-Time, Salaried Employees',
      'All - Temporary/Intern Employees',
    ],
  },
  {
    id: 'admins',
    label: 'Admins',
    options: ['All Admins', 'All Full Admins', 'All Super Admins'],
  },
  {
    id: 'department',
    label: 'Department',
    options: [
      'Customer Support > Customer Success Department',
      'Customer Support > Velocity Department',
      'Customer Support Department',
      'Engineering > Backend Department',
      'Engineering > Frontend Department',
      'Engineering > Infra Department',
      'Engineering Department',
      'Finance Department',
      'Human Resources Department',
      'Information Technology Department',
      'Marketing Department',
      'Sales > Enterprise Department',
      'Sales > Mid-market Department',
      'Sales > SMB Department',
      'Sales > Sales Engineering Department',
      'Sales Department',
    ],
  },
  {
    id: 'state',
    label: 'State',
    options: [
      'AB, CA Locations',
      'Alabama, US Locations',
      'BC, CA Locations',
      'BIR, GB Locations',
      'California, US Locations',
      'Colorado, US Locations',
    ],
  },
  {
    id: 'country',
    label: 'Country',
    options: [
      'Canada Locations',
      'India Locations',
      'United Kingdom Locations',
      'United States Locations',
    ],
  },
  {
    id: 'work-location',
    label: 'Work Location',
    options: [
      'All Remote Employees',
      'Chicago office Office',
      'India office Office',
      'Mountain View office Office',
      'San Francisco Office 2 Office',
      'San Francisco office Office',
      'San Jose office Office',
      'UK Headquarters Office',
      'US default address Office',
    ],
  },
  {
    id: 'entity',
    label: 'Entity',
    options: [
      'Entity: ABC Canada Inc.',
      'Entity: ABC India Inc.',
      'Entity: Wright, Davis and Price',
    ],
  },
  {
    id: 'teams',
    label: 'Teams',
    options: ['Events Team', 'Operations Team', 'Softball Team Team', 'Support Team'],
  },
  {
    id: 'employment-types',
    label: 'Employment Types',
    options: [
      'Contractor',
      'Contractor / 1099',
      'Full time',
      'Hourly, full-time',
      'Hourly, part-time',
      'Intern',
      'Salaried, full-time',
      'Salaried, part-time',
      'Temporary / Intern',
    ],
  },
];

const ALL_SUPERGROUP_OPTIONS = new Set(
  SUPERGROUP_CATEGORIES.flatMap((category) => category.options)
);

export function isSupergroupOption(label: string): boolean {
  return ALL_SUPERGROUP_OPTIONS.has(label);
}

export function getSupergroupCategory(id: string): SupergroupCategory | undefined {
  return SUPERGROUP_CATEGORIES.find((category) => category.id === id);
}

function matchesOption(employee: DemoEmployee, option: string): boolean {
  switch (option) {
    case 'All - Contractors':
      return employee.isContractor;
    case 'All - Employees':
      return !employee.isContractor;
    case 'All - Everyone':
      return true;
    case 'All - FLSA Exempt Employees':
      return employee.flsaExempt;
    case 'All - FLSA Non-Exempt Employees':
      return !employee.flsaExempt;
    case 'All - Full-Time, Hourly Employees':
      return employee.isFullTime && employee.isHourly;
    case 'All - Full-Time, Salaried Employees':
      return employee.isFullTime && !employee.isHourly;
    case 'All - Hourly Contractors':
      return employee.isContractor && employee.isHourly;
    case 'All - Managers':
      return employee.isManager;
    case 'All - Part-Time, Hourly Employees':
      return employee.isPartTime && employee.isHourly;
    case 'All - Part-Time, Salaried Employees':
      return employee.isPartTime && !employee.isHourly;
    case 'All - Temporary/Intern Employees':
      return employee.isTemporary;
    case 'All Admins':
      return employee.isAdmin;
    case 'All Full Admins':
      return employee.isAdmin && employee.adminLevel === 'full';
    case 'All Super Admins':
      return employee.isAdmin && employee.adminLevel === 'super';
    case 'All Remote Employees':
      return employee.isRemote;
    default:
      if (employee.subDepartment === option) return true;
      if (employee.department === option) return true;
      if (employee.location === option) return true;
      if (employee.stateGroup === option) return true;
      if (employee.country === option) return true;
      if (employee.entity === option) return true;
      if (employee.team === option) return true;
      if (employee.employmentType === option) return true;
      return false;
  }
}

export function getSupergroupMembers(optionLabel: string): SupergroupMember[] {
  if (!isSupergroupOption(optionLabel)) return [];
  return DEMO_EMPLOYEES.filter((employee) => matchesOption(employee, optionLabel)).map(
    ({ name, title, department, avatar }) => ({ name, title, department, avatar })
  );
}
