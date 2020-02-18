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
import Button from '@components/Button';
import FormField from '@components/FormField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Third party libraries
import { connect } from 'react-redux';

// styles
import './UserRolesPage.scss';

// components
import PermissionAccess from '@components/PermissionAccess';
import Restrict from '@components/Restrict';
import Table from '@components/Table';
import UserRolesPageLoader from '@placeholders/UserRolesPageSkeletonLoader';

// thunks
import { displaySnackMessage } from '@modules/snack';
import {
  createUserRole,
  deleteUserRole,
  editUserRole,
  getUserRoles
} from '@modules/userRoles';

// interfaces
import {
  UserRolesPageProps,
  UserRolesPageState
} from './interfaces';

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
  });

  /*
   * Fetch user roles once component is mounted.
   */
  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    const getRoles = async () => {
      await props.getUserRoles();
    };

    getRoles().then(() => setResourcesPermissions);
  },              []);

  React.useEffect(() => {
    onResetPermission();
  },              [state.isModalOpen]);

  const setResourcesPermissions = () => {
    setState({
      ...state,
      isLoading: false,
      permissions: props.userRoles.permissions,
      resources: props.userRoles.resources,
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * This function renders the delete and edit
   *
   * @param action
   * @param authOption
   * @param role
   * @param actionMethod
   * @param className
   *
   * @return {JSX}
   */
  const renderAction = (action: string, authOption: string, role, actionMethod, className: string) => (
    // <Restrict authorize={authOption}>
    <span className={className} onClick={role && actionMethod(role)}>
      {action}
    </span>
    // </Restrict>
  );

  const userRolesListAction = role => (
    <div className="user-roles-page__table__action-buttons">
      {renderAction('Edit', 'roles:edit', role, toggleEditRoleModal, 'edit')}
      {renderAction('Delete', 'roles:delete', role, handleRoleDelete, 'delete')}
    </div>
  );

  const toggleModal = () => setState({
    ...state,
    title: '',
    description: '',
    isModalOpen: !state.isModalOpen,
    isRequestSent: false,
    isEditMode: false,
  });

  const toggleEditRoleModal = userRole => () => {
    const currentPermissions = userRole.resourceAccessLevels.reduce(
      (resourceAccessLevels, accessLevel) => {
        const formattedResource = {
          _id: accessLevel.resource._id,
          name: accessLevel.resource.name,
          permissionIds: accessLevel.permission.map(permission => permission._id),
        };

        return [...resourceAccessLevels, formattedResource];
      },
      []
    );

    const resources = props.userRoles.resources;

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
      permissions: props.userRoles.permissions,
      selectedRole: userRole,
      isEditMode: true,
      isModalOpen: !state.isModalOpen,
    });
  };

  const toggleDeleteModal = () => {
    setState({
      ...state,
      showDeleteModal: !state.showDeleteModal,
    });
  };

  const handleCreateNewRole = () => {
    const { title, description, resources } = state;

    const updatedResources = resources
      .filter(resource => resource.permissionIds !== undefined && resource.permissionIds.length !== 0)
      .map(resource => ({
        resourceId: resource._id,
        name: resource.name,
        permissionIds: resource.permissionIds,
      }));

    const userRole = {
      title: title.trim(),
      description: description.trim(),
      resourceAccessLevels: updatedResources,
    };

    if (updatedResources.length === 0) {
      return props.displaySnackMessage('Please, check at least one permission');
    }

    setState({ ...state, isRequestSent: true });
    props.createNewRole(userRole)
      .then(() => {
        setState({ ...state, isRequestSent: false });
        onResetPermission();
        toggleModal();
      });
  };

  const handleRoleUpdate = () => {
    const { _id, title, description } = state.selectedRole;

    const updatedResources = state.resources
      .filter(resource => resource.permissionIds !== undefined)
      .map(resource => ({
        resourceId: resource._id,
        name: resource.name,
        permissionIds: resource.permissionIds,
      }));

    if (!updatedResources.find(resource => resource.permissionIds.length)) {
      return props.displaySnackMessage('Please, check at least one permission');
    }

    const roleUpdatePayload = {
      _id,
      title: title.trim(),
      description: description.trim(),
      resourceAccessLevels: updatedResources,
    };

    setState({ ...state, isRequestSent: true });
    props.editUserRole(roleUpdatePayload)
      .then(() => {
        setState({ ...state, isRequestSent: false });
        onResetPermission();
        toggleModal();
      });
  };

  const onResetAccessPermissions = () => {
    setState({
      ...state,
      resources: state.resources
        .map(resource => resource.permissionIds ? {
          _id: resource._id,
          name: resource.name,
        } : {
          ...resource,
        }),
    });
  };

  const onResetPermission = () => onResetAccessPermissions();

  const handleRoleDelete = selectedRole => () => {
    setState({
      ...state,
      selectedRole,
      showDeleteModal: !state.showDeleteModal,
    });
  };

  const onRoleDeleteSubmit = async () => {
    await props.deleteUserRole(state.selectedRole._id);
    toggleDeleteModal();
  };

  const getResourcePermissions = resources => setState({ ...state, resources });

  const fieldStateChanged = (field: keyof UserRolesPageState) => (state) => {
    setState({ ...state, [field]: state.errors.length === 0 });
  };

  const validateTitleDescription = (value) => {
    const hasSpecialCharacters = (char) => {
      const code = char.charCodeAt(0);
      return (!(code > 64 && code < 91) && !(code > 96 && code < 123) && !(code === 32));
    };

    for (const char of value) {
      if (hasSpecialCharacters(char)) { throw new Error('Field should contain only letters'); }
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const RenderNewRoleButton = () => (
    <button className="mdc-button" onClick={toggleModal}>
      <MaterialIcon
        hasRipple icon="add"
        initRipple={null}
      />
      <span className="mdc-button__label">New Role</span>
    </button>
  );

  const RenderModalContent = () => (
    <React.Fragment>
      <div className="form-cell">
        <FormField
          id="title"
          labelText="Role Name"
          type="text"
          leadingIcon={<MaterialIcon role="button" icon="mood" initRipple={null}/>}
          aria-describedby="title-helper-text"
          required
          validator={validateTitleDescription}
          value={state.isEditMode ? state.selectedRole.title : state.title}
          onStateChanged={(e) => { fieldStateChanged('title'); handleInputChange(e); }}
        />
      </div>
      <div className="form-cell">
        <FormField
          id="description"
          labelText="Role Description"
          type="text"
          leadingIcon={<MaterialIcon role="button" icon="grain" initRipple={null}/>}
          aria-describedby="description-helper-text"
          required
          validator={validateTitleDescription}
          value={state.isEditMode ? state.selectedRole.description : state.description}
          onStateChanged={(e) => { fieldStateChanged('description'); handleInputChange(e); }}
        />
      </div>
      <PermissionAccess
        resources={props.userRoles.resources}
        permissions={props.userRoles.permissions}
        getResources={getResourcePermissions}
      />
    </React.Fragment>
  );

  const UserRolePageModal = () => (
    <React.Fragment>
      <Dialog
        open={state.isModalOpen}
        fullScreen={fullScreen}
        onClose={() => setState({ ...state, isModalOpen: false })}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <p className="headline-3">
            {state.isEditMode ? 'Edit Role' : 'Create a new role'}
          </p>
        </DialogTitle>
        <DialogContent className="register">
          {RenderModalContent()}
        </DialogContent>
        <DialogActions>
          <button className="mdc-button" onClick={toggleModal}>
            <span className="mdc-button__label">Dismiss</span>
          </button>
          <Button
            type="button"
            name={state.isEditMode ? 'Update role' : 'Create new role'}
            id="cc-roles"
            disabled={!(state.title && state.description)}
            onClick={state.isEditMode ? handleRoleUpdate : handleCreateNewRole}
            classes="mdc-button big-round-corner-button mdc-button--raised"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  const DeleteRoleModal = role => (
    <Dialog
      open={state.showDeleteModal}
      onClose={ () => setState({ ...state, showDeleteModal: false }) }
      id={role}
    >
      <DialogTitle>
        <p className="headline-3">Delete Role</p>
      </DialogTitle>
      <DialogContent>
        <h4 className="headline-4">{`Permanently delete '${state.selectedRole.title} User' Role`}</h4>
        <h5>
          {state.selectedRole && state.selectedRole.users > 0
            ? `You cannot delete this role as it is assigned to '${state.selectedRole.users} users'`
            : 'This cannot be undone'}
        </h5>
      </DialogContent>
      <DialogActions>
        <button className="mdc-button" onClick={toggleDeleteModal}>
          <span className="mdc-button__label">Dismiss</span>
        </button>
        <Button
          type="button"
          name="Delete"
          disabled={state.selectedRole && state.selectedRole.users > 0}
          id="cc-delete"
          onClick={onRoleDeleteSubmit}
          classes="mdc-button big-round-corner-button mdc-button--raised"
        />
      </DialogActions>
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
            actionItem={ RenderNewRoleButton() }
            body={
              <React.Fragment>
                <div className="user-roles-page__table">
                  { TableContent(Object.entries(props.userRoles.data)) }
                </div>
              </React.Fragment>
              }
          />
          { UserRolePageModal() }
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
  isLoading: state.userRoles.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  getUserRoles: () => dispatch(getUserRoles()),
  createNewRole: userRole => dispatch(createUserRole(userRole)),
  deleteUserRole: userRoleId => dispatch(deleteUserRole(userRoleId)),
  editUserRole: userRoleToUpdate => dispatch(editUserRole(userRoleToUpdate)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRolesPage);
