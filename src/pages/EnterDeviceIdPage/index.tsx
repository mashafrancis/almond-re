import { StateToProps } from '@pages/EnterDeviceIdPage/interfaces';
import { verifyUserDevice } from '@modules/device';
import { displaySnackMessage } from '@modules/snack';
import { getUserDetails } from '@modules/user';
import { connect } from 'react-redux';
import { EnterDeviceIdTemplate } from '@pages/EnterDeviceIdPage/Template';

export const mapStateToProps = (state: StateToProps) => ({
	error: state.error,
	isLoading: state.device.isLoading,
});

export const mapDispatchToProps = (dispatch: any) => ({
	verifyUserDevice: (id: string) => dispatch(verifyUserDevice(id)),
	displaySnackMessage: (message: string) =>
		dispatch(displaySnackMessage(message)),
	getUserDetails: () => dispatch(getUserDetails()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnterDeviceIdTemplate);
