import {Permission, Resource} from "@modules/userRoles/interfaces";


export interface PermissionAccessProps {
  resources: Resource[];
  permissions: Permission[];
  getResources: (state) => void;
}

export interface PermissionAccessState {
  resources: Resource[];
  permissions: Permission[];
}
