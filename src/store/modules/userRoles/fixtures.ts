export const userRoles = [
  {
    userCount: 1,
    deleted: false,
    _id: '5e46b655427c8af9d42eb46a',
    title: 'Tester',
    description: 'This is a test role',
    data: [],
    resourceAccessLevels: [
      {
        permission: [
          {
            _id: '5e439f32fd05da507ca0161e',
            type: 'Add',
          },
          {
            _id: '5e456d694df0c437590ebc3e',
            type: 'Edit',
          },
          {
            _id: '5e45bc5228c0d70f4a9363a3',
            type: 'Delete',
          },
          {
            _id: '5e44f86b2eeeee195403efcb',
            type: 'View',
          },
          {
            _id: '5e439ea3fd05da507ca0161a',
            type: 'No Access',
          },
          {
            _id: '5e439ed9fd05da507ca0161c',
            type: 'Full Access',
          },
        ],
        _id: '5e46b655427c8af9d42eb46b',
        resource: {
          _id: '5e16d15fffb6541b5b909d3e',
          name: 'Requests',
        },
      },
    ],
  },
  {
    userCount: 10,
    deleted: false,
    _id: '5e46b655427c9af9d42eb47a',
    title: 'Regular user',
    description: 'Default user mode',
    data: [],
    resourceAccessLevels: [
      {
        permission: [
          {
            _id: '5e439f32fd05da507ca0161e',
            type: 'Add',
          },
          {
            _id: '5e456d694df0c437590ebc3e',
            type: 'Edit',
          },
          {
            _id: '5e45bc5228c0d70f4a9363a3',
            type: 'Delete',
          },
          {
            _id: '5e44f86b2eeeee195403efcb',
            type: 'View',
          },
          {
            _id: '5e439ea3fd05da507ca0161a',
            type: 'No Access',
          },
          {
            _id: '5e439ed9fd05da507ca0161c',
            type: 'Full Access',
          },
        ],
        _id: '5e46b655427c8af9d42eb46b',
        resource: {
          _id: '5e16d15fffb6541b5b909d3e',
          name: 'Requests',
        },
      },
    ],
  },
];

export const userRoleResourcePermission = {
  data: userRoles,
  permissions: [
    {
      _id: '5e439f32fd05da507ca0161e',
      type: 'Add',
    },
    {
      _id: '5e456d694df0c437590ebc3e',
      type: 'Edit',
    },
    {
      _id: '5e45bc5228c0d70f4a9363a3',
      type: 'Delete',
    },
    {
      _id: '5e44f86b2eeeee195403efcb',
      type: 'View',
    },
    {
      _id: '5e439ed9fd05da507ca0161c',
      type: 'Full Access',
    },
  ],
  resource: {
    _id: '5e16d15fffb6541b5b909d3e',
    name: 'Requests',
  },
};

export const permissions = [
  {
    _id: '5e439f32fd05da507ca0161e',
    type: 'Add',
  },
  {
    _id: '5e456d694df0c437590ebc3e',
    type: 'Edit',
  },
  {
    _id: '5e45bc5228c0d70f4a9363a3',
    type: 'Delete',
  },
  {
    _id: '5e44f86b2eeeee195403efcb',
    type: 'View',
  },
  {
    _id: '5e439ea3fd05da507ca0161a',
    type: 'No Access',
  },
  {
    _id: '5e439ed9fd05da507ca0161c',
    type: 'Full Access',
  },
];

export const resources = [
  {
    _id: '5db373875e38b20ae991710d',
    name: 'People',
  },
  {
    _id: '5e16d15fffb6541b5b909d3e',
    name: 'Requests',
  },
  {
    _id: '5db42955b21bb9ce0cd93f25',
    name: 'Roles',
  },
  {
    _id: '5db373445e38b20ae991710b',
    name: 'Devices',
  },
];

export const newUserRole = {
  title: 'Assistant Manager',
  description: 'Operations Director',
  resourceAccessLevels: [
    {
      resourceId: '-5db373875e38b20ae991710d',
      permissionIds: ['5e439ed9fd05da507ca0161c'],
    },
  ],
};
