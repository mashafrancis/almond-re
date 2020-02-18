import * as React from 'react';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import FormField from '@components/FormField';
import PermissionAccess from '@components/PermissionAccess';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { createUserRole, getUserRoles } from '@modules/userRoles';

// interfaces
import { RolePageFormProps, RolePageFormState } from './interfaces';

// styles
import './RolePageForm.scss';

export class RolePageForm extends React.Component<RolePageFormProps, RolePageFormState> {
  state = {
    fields: {},
    title: '',
    description: '',
    isLoading: false,
    isValid: true,
    errors: [],
    value: '',
    resources: [],
    permissions: [],
    isRequestSent: false,
  };

  componentDidMount () {
    /*
     * checks the store if userRole contains data
     * if true no need to make a call to the endpoint
     * else make use of the userRole data
     */
    this.setState({
      isLoading: false,
      resources: this.props.userRoles.resources,
      permissions: this.props.userRoles.permissions,
    });
  }

  /**
   * Handles text field input change
   *
   * @returns {void}
   * @param e
   */
  handleInputChange = (e) => {
    const { value, name } = e;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  /**
   * Handles text field state change
   *
   * @returns {void}
   * @param field
   */
  fieldStateChanged = (field: keyof RolePageFormState) => (state) => {
    this.setState({ ...state, [field]: state.errors.length === 0 });
  }

  /**
   * Validates the title and description field
   *
   * @returns {void}
   * @param value
   */
  validateTitleDescription = (value) => {
    const hasSpecialCharacters = (char) => {
      const code = char.charCodeAt(0);
      return (!(code > 64 && code < 91) && !(code > 96 && code < 123) && !(code === 32));
    };

    for (const char of value) {
      if (hasSpecialCharacters(char)) { throw new Error('Field should contain only letters'); }
    }
  }

  /**
   * This function is use to get resources state from the
   * PermissionAccess component to update the resources state
   * so it can be used to add a new user role
   *
   * @param {array} resources
   * @returns {void}
   */
  getResourcePermissions = (resources) => {
    this.setState({ resources });
  }

  /**
   * This method will create a new user role
   *
   * @memberof UserRolesPage
   *
   * @return {void}
   */
  handleCreateNewRole = () => {
    const { title, description, resources } = this.state;

    const updatedResources = resources
      .filter(resource => resource.permissionIds !== undefined && resource.permissionIds.length !== 0)
      .map(resource => ({
        resourceId: resource.id,
        name: resource.name,
        permissionIds: resource.permissionIds,
      }));

    const userRole = {
      title: title.trim(),
      description: description.trim(),
      resourceAccessLevels: updatedResources,
    };

    if (updatedResources.length === 0) {
      return this.props.displaySnackMessage('Please, check at least one permission');
    }

    this.setState({ isRequestSent: true });
    this.props.createNewRole(userRole)
      .then(() => {
        this.setState({ isRequestSent: false });
        // if (this.props.successType.type === 'success') {
        //   this.onResetPermission();
        //   this.toggleModal();
        // }
      });
  }

  renderRolePageForm = () => {
    return (
      <React.Fragment>
        <div className="form-cell">
          <FormField
            id="title"
            labelText="Role Name"
            type="text"
            leadingIcon={<MaterialIcon role="button" icon="mood" initRipple={null}/>}
            aria-describedby="title-helper-text"
            required
            validator={this.validateTitleDescription}
            onStateChanged={(e) => { this.fieldStateChanged('title'); this.handleInputChange(e); }}
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
            validator={this.validateTitleDescription}
            onStateChanged={(e) => { this.fieldStateChanged('description'); this.handleInputChange(e); }}
          />
        </div>
        <div className="form-cell">
          <PermissionAccess
            resources={this.state.resources}
            permissions={this.state.permissions}
            getResources={this.getResourcePermissions}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { isLoading, title, description } = this.state;
    const formValidated = description && title;

    return (
      <div className="register">
        <AuthHeader
          forwardButtonName=""
          backwardButtonName="Back"
          forwardLink={'/'}
          backwardLink={'/user-roles'}
        />
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-4 mdc-layout-grid__cell--align-middle"
              columns={6}
              desktopColumns={6}
              tabletColumns={8}
              phoneColumns={4}
            >
              <h1 className="headline-2">Create a new role</h1>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-4 register__section mdc-layout-grid__cell--align-middle"
              align="middle"
              order={4}
              columns={6}
              desktopColumns={6}
              tabletColumns={8}
              phoneColumns={4}
            >
              {this.renderRolePageForm()}
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-4 mdc-layout-grid__cell--align-middle"
              align="middle"
            >
              <Button
                type="button"
                name={isLoading ? 'Creating role...' : 'Create new role'}
                id="cc-roles"
                disabled={!formValidated}
                onClick={this.handleCreateNewRole}
                classes="mdc-button big-round-corner-button mdc-button--raised"
              />
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userRoles: state.userRoles,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  createNewRole: userRole => dispatch(createUserRole(userRole)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RolePageForm);
