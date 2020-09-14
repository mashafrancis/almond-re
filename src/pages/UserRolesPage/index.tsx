// react libraries
import React, { useState, useEffect } from 'react';

// Third party libraries
import {
  Cell,
  Row,
} from '@material/react-layout-grid';
import { connect } from 'react-redux';
import { Chip } from '@material-ui/core';
import loadable from '@loadable/component';

// icons
import {
  Mood,
  Grain,
  Face,
} from '@material-ui/icons';

// components
import FormField from '@components/FormField';
import PermissionAccess from '@components/PermissionAccess';
// import Restrict from '@components/Restrict';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// styles
import './UserRolesPage.scss';

// thunks
import { displaySnackMessage } from '@modules/snack';
import {
  createUserRole,
  deleteUserRole,
  editUserRole,
  getUserRoles,
} from '@modules/userRoles';

// interfaces
import {
  UserRolesPageProps,
  UserRolesPageState,
} from './interfaces';
import {
  UserRole,
} from '@modules/userRoles/interfaces';
import minimumDelay from '@utils/MinimumDelay';

const CardInfo = loadable(() => import('@components/CardInfo'));
const Table = loadable(() => import('@components/Table'));
const Modal = loadable(() => import('@components/Modal'));

export const UserRolesPage = (props: UserRolesPageProps): JSX.Element => {
  const [state, setState] = useState<UserRolesPageState>({
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
  useEffect(() => {
    setState({ ...state, isLoading: true });
    const getRoles = async () => {
      await props.getUserRoles();
    };

    getRoles().then(() => setResourcesPermissions);
  }, []);

  useEffect(() => {
    onResetPermission();
  }, [state.isModalOpen]);

  const setResourcesPermissions = () => {
    setState(prevState => ({
      ...prevState,
      isLoading: false,
      permissions: props.userRoles.permissions,
      resources: props.userRoles.resources,
    }));
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
  const renderAction = (action: string, authOption: string, role, actionMethod, className: string): JSX.Element => (
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

  const toggleModal = () => setState(prevState => ({
    ...prevState,
    title: '',
    description: '',
    isModalOpen: !prevState.isModalOpen,
    isRequestSent: false,
    isEditMode: false,
  }));

  const toggleDeleteModal = () => setState(prevState => ({
    ...prevState,
    showDeleteModal: !prevState.showDeleteModal,
  }));

  const toggleEditRoleModal = userRole => () => {
    const currentPermissions = userRole.resourceAccessLevels.reduce(
      (resourceAccessLevels, accessLevel) => {
        const formattedResource = {
          _id: accessLevel.resource._id,
          name: accessLevel.resource.name,
          permissionIds: accessLevel.permissions.map(permission => permission._id),
        };

        return [...resourceAccessLevels, formattedResource];
      }, [],
    );

    const { resources } = props.userRoles;

    // @ts-ignore
    const currentResources = resources.map(resource => {
      let newResource = resource;
      currentPermissions.forEach(res => {
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

    const updatedResources: any = state.resources
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
    props.editUserRole(roleUpdatePayload as UserRole)
      .then(() => {
        setState({ ...state, isRequestSent: false });
        onResetPermission();
        toggleModal();
      });
  };

  const onResetAccessPermissions = () => {
    setState(prevState => ({
      ...prevState,
      resources: state.resources
        .map(resource => resource.permissionIds ? {
          _id: resource._id,
          name: resource.name,
        } : {
          ...resource,
        }),
    }));
  };

  const onResetPermission = () => onResetAccessPermissions();

  const handleRoleDelete = selectedRole => () => {
    setState(prevState => ({
      ...prevState,
      selectedRole,
      showDeleteModal: !prevState.showDeleteModal,
    }));
  };

  const onRoleDeleteSubmit = async () => {
    await props.deleteUserRole(state.selectedRole._id);
    toggleDeleteModal();
  };

  const getResourcePermissions = resources => setState({ ...state, resources });

  const fieldStateChanged = (field: keyof UserRolesPageState) => state => {
    setState(prevState => ({ ...prevState, [field]: state.errors.length === 0 }));
  };

  const validateTitleDescription = value => {
    const hasSpecialCharacters = char => {
      const code = char.charCodeAt(0);
      return !(code > 64 && code < 91) && !(code > 96 && code < 123) && !(code === 32);
    };

    for (const char of value) {
      if (hasSpecialCharacters(char)) {
        throw new Error('Field should contain only letters');
      }
    }
  };

  const handleInputChange = e => {
    const { value, name } = e;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const RenderModalContent = () => (
    <>
      <div className="form-cell">
        <FormField
          id="title"
          labelText="Role Name"
          type="text"
          leadingIcon={<Mood/>}
          aria-describedby="title-helper-text"
          required
          validator={validateTitleDescription}
          value={state.isEditMode ? state.selectedRole.title : state.title}
          onStateChanged={e => {
            fieldStateChanged('title');
            handleInputChange(e);
          }}
        />
      </div>
      <div className="form-cell">
        <FormField
          id="description"
          labelText="Role Description"
          type="text"
          leadingIcon={<Grain/>}
          aria-describedby="description-helper-text"
          required
          validator={validateTitleDescription}
          value={state.isEditMode ? state.selectedRole.description : state.description}
          onStateChanged={e => {
            fieldStateChanged('description');
            handleInputChange(e);
          }}
        />
      </div>
      <PermissionAccess
        resources={props.userRoles.resources}
        permissions={props.userRoles.permissions}
        getResources={getResourcePermissions}
      />
    </>
  );

  const UserRolePageModal = () => (
    <Modal
      fullScreen={fullScreen}
      isModalOpen={state.isModalOpen}
      renderContent={() => RenderModalContent()}
      onClose={() => setState({ ...state, isModalOpen: false })}
      disabled={!(state.title && state.description)}
      renderHeader={() => state.isEditMode ? 'Edit user role' : 'Create a new role'}
      submitButtonName={state.isEditMode ? 'Update role' : 'Create role'}
      onSubmit={state.isEditMode ? handleRoleUpdate : handleCreateNewRole}
      onDismiss={toggleModal}
    />
  );

  const DeleteRoleModal = () => {
    const userCount = state.selectedRole?.userCount;
    return (
      <Modal
        isModalOpen={state.showDeleteModal}
        renderContent={() =>
          <>
            <h4 className="headline-4">{`Permanently delete role: ${state.selectedRole.title}`}</h4>
            <h5 className="headline-5">
              {state.selectedRole && userCount > 0
                ? `You cannot delete this role as it is assigned to ${userCount} user${userCount > 1 ? 's' : ''}`
                : 'This cannot be undone'}
            </h5>
          </>
        }
        onClose={toggleDeleteModal}
        renderHeader={() => 'Delete Role'}
        submitButtonName="Delete role"
        onSubmit={onRoleDeleteSubmit}
        onDismiss={toggleDeleteModal}
        disabled={state.selectedRole && userCount > 0}
      />
    );
  }

  const TableContent = userRoles => {
    const tableHeaders = {
      Role: { valueKey: 'title', colWidth: '15' },
      Description: { valueKey: 'description', colWidth: '50' },
      Users: { valueKey: 'userCount', colWidth: '15' },
      Actions: { valueKey: 'actions' },
    };

    const tableValues = userRoles.map(role => ({
      id: role[1]._id,
      title: role[1].title,
      description: role[1].description,
      userCount: <Chip className="MuiChip-root-enabled" label={role[1].userCount}/>,
      actions: userRolesListAction(role[1]),
    }));

    return (
      <Table
        keys={tableHeaders}
        values={tableValues}
      />
    );
  };

  return (
    <div className="user-roles-page">
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          <CardInfo
            mainHeader="User Roles"
            subHeader="Create a new role for users with Almond"
            icon={<Face className="content-icon"/>}
            buttonName="Add role"
            onClick={toggleModal}
          />
          <React.Suspense fallback={minimumDelay(import('@components/LinearProgressBar'), 500)}>
            <div className="user-roles-page__table">
              {TableContent(Object.entries(props.userRoles.roles))}
            </div>
          </React.Suspense>
          {UserRolePageModal()}
          {DeleteRoleModal()}
        </Cell>
      </Row>
    </div>
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
