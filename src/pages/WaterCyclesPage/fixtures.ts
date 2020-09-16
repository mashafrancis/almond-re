export const timeSchedule = [
  {
    time: '7.00',
    actions: 'action',
    status: 'status',
  },
  {
    time: '8.00',
    actions: 'action',
    status: 'status',
  },
];

export const activityLogs = [
  {
    type: 'info',
    date: '2019-10-30T08:00:42.767Z',
    message: 'Pump successfully turned on!',
  },
  {
    type: 'error',
    date: '2019-10-30T08:00:42.767Z',
    message: 'Pump crashed by dragon!',
  },
  {
    type: 'error',
    date: '2019-10-30T08:00:42.767Z',
    message: 'Connection lost while pumping.',
  },
  {
    type: 'error',
    date: '2019-10-30T08:00:42.767Z',
    message: 'Pump has been destroyed by dragon!',
  },
  {
    type: 'info',
    date: '2019-10-30T08:00:42.767Z',
    message: 'Pump successfully turned on!',
  },
  {
    type: 'info',
    date: '2019-10-30T08:00:42.767Z',
    message: 'Pump successfully destroyed by virus!',
  },
];

export const props = {
  getAllSchedules: jest.fn(() => Promise.resolve()),
  deleteSingleSchedule: jest.fn(() => Promise.resolve()),
  displaySnackMessage: jest.fn(() => Promise.resolve()),
  togglePump: jest.fn(() => Promise.resolve()),
  getPumpStatus: jest.fn(() => Promise.resolve()),
  toggleScheduleStatus: jest.fn(() => Promise.resolve()),
  addNewSchedule: jest.fn(() => Promise.resolve()),
  editSchedule: jest.fn(() => Promise.resolve()),
  getWaterData: jest.fn(() => Promise.resolve()),
  schedules: [],
  isLoading: false,
  location: Location as any,
  enabled: true,
  devices: [{
    _id: '',
    id: '',
    verified: false,
    enabled: false,
    user: '',
    updatedAt: '',
  }],
  waterData: {
    waterLevel: 100,
  },
  match: {
    url: '/dashboard',
  },
};
