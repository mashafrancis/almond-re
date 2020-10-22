// react libraries
import { mapDispatchToProps, mapStateToProps } from './index';

describe('The DashboardContainer component', () => {
	describe('mapStateToProps', () => {
		const state = {
			user: {
				userDetails: {},
			},
			loading: '',
			userRoles: {
				roles: [],
			},
			activityLogs: {},
			device: {
				activeDevice: '',
			},
		};

		const props = mapStateToProps(state);

		it('should map dashboard props from state', () => {
			expect(props.user).toEqual(state.user.userDetails);
			// expect(props.loading).toEqual(state.loading);
			expect(props.roles).toEqual(state.userRoles.roles);
			expect(props.activityLogs).toEqual(state.activityLogs);
			// expect(props.activeDevice).toEqual(state.device.activeDevice);
		});
	});

	describe('mapDispatchToProps', () => {
		let dispatch;
		let props;

		beforeEach(() => {
			dispatch = jest.fn();
			props = mapDispatchToProps(dispatch) as any;
		});

		afterEach(() => {
			dispatch = props = null;
		});

		it('ensures logoutUser is mapped to props', () => {
			props.logoutUser();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures getUserDetails is mapped to props', () => {
			props.getUserDetails();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures activateDevice is mapped to props', () => {
			props.activateDevice();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures updatePerson is mapped to props', () => {
			props.editUserDetails();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
