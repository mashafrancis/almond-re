// react libraries
import * as React from 'react';

// components
import Checkbox from '@material/react-checkbox';

// interfaces
import { PermissionAccessProps, PermissionAccessState } from './interfaces';

// helpers
import capitalize from '../../utils/helpers/capitalize';

class PermissionAccess extends React.Component<PermissionAccessProps, PermissionAccessState> {
  /*
   * This stores a permission to permissionId mapping e.g { 'Full Access': 5e439f32fd05da507ca0161e, ... }
   */
  mappedPermissions = {
    'full access': '',
    view: '',
    add: '',
    edit: '',
    delete: '',
  };

  state = {
    resources: [],
    permissions: [],
  };

  async componentDidMount() {
    await this.setState({
      resources: this.props.resources,
      permissions: this.props.permissions,
    });
    if (this.state.resources.length && this.state.permissions.length) {
      /*
       * Force the order of the permissions to start with full access
       * and end with delete
       */
      Object.keys(this.mappedPermissions)
        .forEach((permissionString) => {
          this.mappedPermissions[permissionString] = this.state.permissions
            .find(permissionObject => permissionObject.type.toLowerCase() === permissionString)._id;
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resources !== this.props.resources) {
      this.setState({
        resources: this.props.resources,
        permissions: this.props.permissions,
      });

      Object.keys(this.mappedPermissions)
        .forEach((permissionString) => {
          const permissionKey = this.state.permissions
            .find(permissionObject => permissionObject.type.toLowerCase() === permissionString);

          if (permissionKey) {
            this.mappedPermissions[permissionString] = permissionKey._id;
          }
        });
    }
  }

  /**
   * Toggle a permission on or off for each of the resources
   *
   * @param {string} resourceId
   * @param {string} permissionType
   *
   * @returns {void}
   */
  togglePermission = (resourceId, permissionType) => () => {
    const permissionId = this.mappedPermissions[permissionType];
    // this takes the current permission Ids for the given resource and toggles the value within that array
    let getNewPermissionIds;
    // if this is the full access permission
    if (this.mappedPermissions['full access'] === permissionId) {
      getNewPermissionIds = (currentPermissionIds) => {
        // switch off all permissions if the user toggles off 'full access' otherwise make it the only one
        return currentPermissionIds.includes(permissionId) ? [] : [permissionId];
      };
    } else {
      getNewPermissionIds = (currentPermissionIds) => {
        /*
         * if current permissions contain 'full access', it should be removed and every other permission
         * asides the one that was clicked, should be added
         */
        if (currentPermissionIds.includes(this.mappedPermissions['full access'])) {
          return Object.values(this.mappedPermissions)
            .filter(
              currentPermissionId => currentPermissionId !== permissionId
              &&
              currentPermissionId !== this.mappedPermissions['full access']
            );
        }

        return currentPermissionIds.includes(permissionId)
          ? currentPermissionIds.filter(currentPermissionId => currentPermissionId !== permissionId)
          : [...currentPermissionIds, permissionId];
      };
    }
    this.setState({
      resources: this.state.resources.map(resource => resource._id === resourceId ? ({
        ...resource,
        permissionIds: getNewPermissionIds(resource.permissionIds || []),
      }) : resource),
    },            () => this.props.getResources(this.state.resources));
  }

  /**
   * Checks if a particular permission for
   * a given resource has been toggled on or off
   *
   * @param {string} resourceId
   * @param {string} permissionId
   *
   * @returns {boolean}
   */
  isResourcePermissionActive(resourceId, permissionId) {
    let isActive = false;
    // get the resource in question
    const resource = this.state.resources.filter(resource => resource._id === resourceId)[0];
    /*
     * it's active if it has the 'full access' toggled on or
     * if the permission for this checkbox has been toggled on
     */
    if (
      resource.permissionIds &&
      (resource.permissionIds.includes(this.mappedPermissions['full access']) ||
      resource.permissionIds.includes(permissionId))
    ) {
      isActive = true;
    }
    return isActive;
  }

  render() {
    return (
      <React.Fragment>
        <div className="add-role-form__content__row">
          <p className="row-label">Permission access</p>
          <div className="permissions">
            <div className="permissions__tbl-header">
              <div className="permissions__tbl-header__column access-levels">Access levels</div>
              {
                Object.keys(this.mappedPermissions)
                  .map(permissionString => ((
                    <div key={permissionString} className="permissions__tbl-header__column">
                      {`${capitalize(permissionString)}`}
                    </div>)
                  ))
              }
            </div>
            <div className="permissions__tbl-body">
              {
                this.state.resources && this.state.resources.map(resource => (
                  <div key={resource._id} className="permissions__tbl-row">
                    <div className="permissions__tbl-row__item header">{resource.name}</div>
                    {
                      Object.keys(this.mappedPermissions).map(permission => (
                        <div key={`${resource.name}-${permission}}`} className="permissions__tbl-row__item">
                          <Checkbox
                            checked={this.props.resources &&
                              this.isResourcePermissionActive(resource._id, this.mappedPermissions[permission])}
                            name={`${resource.name}-${permission}`}
                            onChange={this.togglePermission(resource._id, permission)}
                          />
                        </div>
                      ))
                    }
                  </div>
                ))
            }
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default PermissionAccess;
