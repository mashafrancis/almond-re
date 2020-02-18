import { UserRole } from '@modules/userRoles/interfaces';
import UserRolesPageLoader from '@placeholders/UserRolesPageSkeletonLoader';
import * as React from 'react';

// react libraries
import DashboardCard from '@components/DashboardCard';
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import DashboardContainer from '@pages/DashboardContainer';

// components
import Loader from '@components/Loader';
import Dialog, { DialogButton, DialogContent, DialogFooter, DialogTitle } from '@material/react-dialog/index';

// Third party libraries
import { connect } from 'react-redux';

// styles
import './UserRolesPage.scss';

// components
import PermissionAccess from '@components/PermissionAccess';
import Restrict from '@components/Restrict';
import Table from '@components/Table';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { deleteUserRole, editUserRole, getUserRoles } from '@modules/userRoles';
import { Link } from 'react-router-dom';

// interfaces
import { UserRolesPageProps, UserRolesPageState } from './interfaces';

export const UserRolesPage: React.FunctionComponent<UserRolesPageProps> = (props) => {
  const [state, setState] = React.useState<UserRolesPageState>({
    isLoading: false,
    isRequestSent: false,
    showDeleteModal: false,
    permissions: [],
    selectedRole: {} as any,
    isModalOpen: false,
    resources: [],
    title: '',
    description: '',
    isEditMode: false,
    action: '',
    id: '',
    errors: {
      title: '',
      description: '',
    },
  });

  /*
   * Fetch user roles once component is mounted.
   */
  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    switch (state.action) {
      case 'delete':
        props.deleteUserRole(state.selectedRole._id)
          .then(() => setState({ ...state, showDeleteModal: false }));
        break;
      case 'dismiss':
        setState({ ...state, showDeleteModal: false });
        break;
    }
    props.getUserRoles()
      .then(() => setState({
        ...state,
        isLoading: false,
        resources: props.userRoles.resources,
        permissions: props.userRoles.permissions,
      }));
  },              [state.action]);

  /**
   * This function renders the delete and edit
   *
   * @param action
   * @param authOption
   * @param {assets} asset
   * @param actionMethod
   * @param className
   *
   * @return {JSX}
   */
  const renderAction = (action: string, authOption: string, asset, actionMethod, className: string) => (
    // <Restrict authorize={authOption}>
    <span className={className} onClick={asset && actionMethod(asset)}>
      {action}
    </span>
    // </Restrict>
  );

  /**
   * Fetch asset categories once component is mounted.
   *
   * @returns {JSX}
   * @param role
   */
  const userRolesListAction = role => (
    <div className="user-roles-page__table__action-buttons">
      {renderAction('Edit', 'roles:edit', role, getCurrentPermissions, 'edit')}
      {renderAction('Delete', 'roles:delete', role, handleRoleDelete, 'delete')}
    </div>
  );

  const ActionButtons = (role: UserRole) => (
    <div key={role._id} className="action-buttons">
      <span onClick={ () => setState({ ...state, id: role._id, isEditMode: true })}>
        <Link to={`${props.match.url}/edit/${role._id}`}>
          <h5 className="action-buttons__edit">Edit</h5>
        </Link>
      </span>
      <span
        id={role._id}
        onClick={ () => setState({
          ...state,
          id: role._id,
          selectedRole: {
            ...state.selectedRole,
            // [e.target.name]: e.target.value,
          },
          showDeleteModal: true })}
      >
        <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  );

   /**
    * This function resets the resources with permissionIds
    *
    * @returns {void}
    */
  const onResetAccessPermissions = () => {
    setState({
      ...state,
      resources: state.resources
        .map(resource => resource.permissionIds ? {
          id: resource.id,
          name: resource.name,
        } : {
          ...resource,
        }),
    });
  };

  /**
   * This function resets the resources state in the
   * PermissionAccess component
   */
  const onResetPermission = () => {
    onResetAccessPermissions();
  };

  /**
   * Toggles edit role modal
   *
   * @param {Object} userRole
   * @returns {JSX}
   */
  const getCurrentPermissions = userRole => () => {
    const currentPermissions = userRole.resourceAccessLevels.reduce(
      (resourceAccessLevels, accessLevel) => {
        const formattedResource = {
          id: accessLevel.resource.id,
          name: accessLevel.resource.name,
          permissionIds: accessLevel.permissions.map(permission => permission.id),
        };

        return [...resourceAccessLevels, formattedResource];
      },
      []
    );

    const resources = this.props.userRoles.resources;

    const currentResources = resources.map((resource) => {
      let newResource = resource;
      currentPermissions.forEach((res) => {
        if (res.name === resource.name) {
          newResource = res;
        }
      });

      return newResource;
    });

    setState({
      ...state,
      resources: currentResources,
      selectedRole: userRole,
      isEditMode: true,
      isModalOpen: !state.isModalOpen,
    });
  };

  // /**
  //  * Updates state when any of the input fields change
  //  *
  //  * @param {Event} event
  //  *
  //  * @returns {void}
  //  */
  // const handleFieldChange = (event) => {
  //   this.state.isEditMode
  //     ? this.setState({
  //       selectedRole: {
  //         ...this.state.selectedRole,
  //         [event.target.name]: event.target.value,
  //       },
  //     })
  //     : this.setState({
  //       ...this.state,
  //       [event.target.name]: event.target.value,
  //       errors: {
  //         ...this.state.errors,
  //         [event.target.name]: '',
  //       },
  //     });
  // };

  /**
   * This method is called to save the selected role and toggle the modal
   *
   * @memberof UserRolesPage
   * @param {string} selectedRole
   * @returns {void}
   */
  const handleRoleDelete = selectedRole => () => {
    setState({
      ...state,
      selectedRole,
      showDeleteModal: !state.showDeleteModal,
    });
  };

  // /**
  //  * This method initializes the action to update a role
  //  *
  //  * @memberof UserRolesPage
  //  *
  //  * @returns {void}
  //  */
  // const onRoleUpdateSubmit = () => {
  //   const { id, title, description } = this.state.selectedRole;
  //
  //   const updatedResources = this.state.resources
  //     .filter(resource => resource.permissionIds !== undefined)
  //     .map(resource => ({
  //       resourceId: resource.id,
  //       name: resource.name,
  //       permissionIds: resource.permissionIds,
  //     }));
  //
  //   if (!updatedResources.find(resource => resource.permissionIds.length)) {
  //     return this.props.displaySnackMessage('Please, check at least one permission');
  //   }
  //
  //   const roleUpdatePayload = {
  //     id,
  //     title: title.trim(),
  //     description: description.trim(),
  //     resourceAccessLevels: updatedResources,
  //   };
  //
  //   this.setState({ isRequestSent: true });
  //   this.props.editUserRole(roleUpdatePayload)
  //     .then(() => {
  //       this.setState({ isRequestSent: false });
  //       // if (this.props.successType.type === 'success') {
  //       //   this.onResetPermission();
  //       //   this.toggleModal();
  //       // }
  //     });
  // };

  /**
   * This function is use to get resources state from the
   * PermissionAccess component to update the resources state
   * so it can be used to add a new user role
   *
   * @param {array} resources
   * @returns {void}
   */
  const getResourcePermissions = resources => setState({ ...state, resources });

  const renderNewRoleButton = () => (
    <Link to={'/user-roles/:add'}>
      {/*<Restrict authorize={['roles:add']}>*/}
      <button className="mdc-button">
        <MaterialIcon
          hasRipple icon="add"
          initRipple={null}
        />
        <span className="mdc-button__label">New Role</span>
      </button>
      {/*</Restrict>*/}
    </Link>
  );

  const DeleteRoleModal = role => (
    <Dialog
      open={state.showDeleteModal}
      onClose={ action => setState({ ...state, action, showDeleteModal: false }) }
      id={role}
    >
      <DialogTitle>DELETE ROLE</DialogTitle>
      <DialogContent>
        <h4>{`Permanently delete '${state.selectedRole.title} User' Role`}</h4>
        <h5>
          {state.selectedRole && state.selectedRole.users > 0
            ? `You cannot delete this role as it is assigned to '${state.selectedRole.users} users'`
            : 'This cannot be undone'}
        </h5>
      </DialogContent>
      <DialogFooter>
        <DialogButton action="dismiss">Dismiss</DialogButton>
        <DialogButton action="delete" isDefault>Delete</DialogButton>
      </DialogFooter>
    </Dialog>
  );

  const TableContent = (userRoles) => {
    const tableHeaders = {
      Role: { valueKey: 'title', colWidth: '20' },
      Description: { valueKey: 'description', colWidth: '40' },
      Users: { valueKey: 'userCount', colWidth: '15' },
      Actions: { valueKey: 'actions', colWidth: '5' },
    };

    const tableValues = userRoles.map(role => ({
      id: role[1]._id,
      title: role[1].title,
      description: role[1].description,
      userCount: role[1].userCount,
      actions: userRolesListAction(role[1]),
    }));

    return (
      props.isLoading ? (<UserRolesPageLoader/>) :
      <Table
        keys={tableHeaders}
        values={tableValues}
      />
    );
  };

  const UserRolesPageComponent = () => (
    <Grid>
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          {(window.innerWidth < 539) && <div className="main-subheader"><h3>User Roles</h3></div>}
        </Cell>
      </Row>
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes=""
            heading=""
            actionItem={ renderNewRoleButton() }
            body={
              <React.Fragment>
                <div className="user-roles-page__table">
                  { TableContent(Object.entries(props.userRoles.data)) }
                </div>
              </React.Fragment>
              }
          />
          { DeleteRoleModal(state.selectedRole._id) }
        </Cell>
      </Row>
    </Grid>
  );

  return (
    <DashboardContainer
      title="User Roles"
      component={ UserRolesPageComponent() }
    />
  );
};

export const mapStateToProps = state => ({
  userRoles: state.userRoles,
  successType: state.toast,
  isLoading: state.userRoles.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  getUserRoles: () => dispatch(getUserRoles()),
  deleteUserRole: userRoleId => dispatch(deleteUserRole(userRoleId)),
  editUserRole: userRoleToUpdate => dispatch(editUserRole(userRoleToUpdate)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRolesPage);
