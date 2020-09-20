// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getState = jest.fn<[], unknown>(() => ({
	internalServerError: {
		error: false,
	},
	timeSchedules: {
		schedules: [],
		enabled: false,
		isLoading: true,
		errors: null,
	},
	snack: {},
	user: {
		userDetails: {
			roles: [
				{
					_id: '5e4703d62faee61d8ede2d65',
					title: 'User',
					description: 'Almond regular user with limited privileges',
					resourceAccessLevels: [
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5e17d95fffb6541b6b909d3e',
								name: 'Analytics',
							},
							_id: '5e4703d62faee61d8ede2d66',
						},
					],
				},
				{
					_id: '5e555801465ca301b1143b90',
					title: 'Admin',
					description: 'Almond administrator with full permissions',
					resourceAccessLevels: [
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5e17d95fffb6541b6b909d3e',
								name: 'Analytics',
							},
							_id: '5e4703d62faee61d8ede2d66',
						},
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5db42955b21bb9ce0cd93f25',
								name: 'Roles',
							},
							_id: '5e555801465ca301b1143b91',
						},
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5e17d95fffb6541b6b909d3e',
								name: 'Analytics',
							},
							_id: '5e4703d62faee61d8ede2d66',
						},
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5db373445e38b20ae991710b',
								name: 'Devices',
							},
							_id: '5e555801465ca301b1143b92',
						},
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5db373875e38b20ae991710d',
								name: 'People',
							},
							_id: '5e555801465ca301b1143b93',
						},
						{
							permissions: [
								{
									_id: '5e439ed9fd05da507ca0161c',
									type: 'Full Access',
								},
							],
							resource: {
								_id: '5e16d15fffb6541b5b909d3e',
								name: 'Requests',
							},
							_id: '5e555801465ca301b1143b94',
						},
					],
				},
			],
			photo:
				'https://lh3.googleusercontent.com/a-/AOh14GgKr2zQe5O4NVIdatRd2zyd_hIKJ2zgqAhHR38XHIU',
			isVerified: true,
			devices: [
				{
					verified: true,
					enabled: true,
					_id: '5e4a57ffa04a6d8445b5885b',
					id: 'ABC123',
					updatedAt: '2020-06-07T14:48:12.258Z',
					user: '5edcfe1fb1ccd100710d36a3',
				},
			],
			_id: '5edcfe1fb1ccd100710d36a3',
			googleId: '108539652447541624788',
			name: 'Francis Masha',
			email: 'francismasha96@gmail.com',
			currentRole: {
				_id: '5e4703d62faee61d8ede2d65',
				title: 'User',
			},
			createdAt: '2020-06-07T14:47:59.879Z',
			updatedAt: '2020-09-14T03:10:05.102Z',
			__v: 0,
			activeDevice: {
				verified: true,
				enabled: true,
				_id: '5e4a57ffa04a6d8445b5885b',
				id: 'ABC123',
				updatedAt: '2020-06-07T14:48:12.258Z',
				user: '5edcfe1fb1ccd100710d36a3',
			},
		},
		permissions: {
			analytics: {
				fullAccess: true,
				edit: true,
				delete: true,
				view: true,
				add: true,
			},
			devices: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: false,
				add: false,
			},
			roles: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: false,
				add: false,
			},
			people: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: false,
				add: false,
			},
			requests: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: false,
				add: false,
			},
		},
		errors: null,
	},
	device: {
		isLoading: true,
		errors: null,
		activeDevice: {},
		devices: [],
	},
	userRoles: {
		roles: [],
		resources: [],
		permissions: [],
		isLoading: false,
		errors: null,
	},
	people: {
		people: [],
		errors: null,
	},
	activityLogs: [],
	loading: 'success',
	sensorData: {
		environmentData: [],
		waterData: [],
		errors: null,
	},
}));

export default getState;
