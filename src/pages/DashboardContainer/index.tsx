import { editUserDetails, getUserDetails, logoutUser } from '@modules/user';
import { activateDevice } from '@modules/device';
import { connect } from 'react-redux';
import DashboardTemplate from '@pages/DashboardContainer/Template';

export const mapStateToProps = (state: any) => ({
	user: state.user.userDetails,
	roles: state.userRoles.roles,
	activityLogs: state.activityLogs,
});

export const mapDispatchToProps = (dispatch: any) => ({
	getUserDetails: () => dispatch(getUserDetails()),
	logoutUser: () => dispatch(logoutUser()),
	activateDevice: (id: string) => dispatch(activateDevice(id)),
	editUserDetails: (id: string, role: any) =>
		dispatch(editUserDetails(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTemplate);
