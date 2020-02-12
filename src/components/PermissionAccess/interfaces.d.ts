import { Permissions, Resources } from '@pages/UserRolesPage/interfaces';

export interface PermissionAccessProps {
  resources: Resources[];
  permissions: Permissions[];
  getResources: (state) => void;
}

export interface PermissionAccessState {
  resources: Resources[];
  permissions: Permissions[];
}
