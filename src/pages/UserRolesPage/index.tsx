import {
	createUserRole,
	deleteUserRole,
	editUserRole,
	getUserRoles,
} from '@modules/userRoles';
import { displaySnackMessage } from '@modules/snack';
import { connect } from 'react-redux';
import UserRolesTemplate from '@pages/UserRolesPage/Template';

export const mapStateToProps = (state) => ({
	userRoles: state.userRoles,
	isLoading: state.userRoles.isLoading,
});

export const mapDispatchToProps = (dispatch) => ({
	getUserRoles: () => dispatch(getUserRoles()),
	createNewRole: (userRole) => dispatch(createUserRole(userRole)),
	deleteUserRole: (userRoleId) => dispatch(deleteUserRole(userRoleId)),
	editUserRole: (userRoleToUpdate) => dispatch(editUserRole(userRoleToUpdate)),
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRolesTemplate);
