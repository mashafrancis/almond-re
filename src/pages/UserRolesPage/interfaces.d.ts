import {Permission, Resource, UserRole} from '@modules/userRoles/interfaces';

export interface UserRolesPageProps {
  userRoles: {
    roles: UserRole[];
    permissions: Permission[];
    resources: Resource[];
  };
  getUserRoles: () => Promise<any>;
  deleteUserRole: (id) => Promise<any>;
  editUserRole: (userRole: UserRole) => Promise<any>;
  createNewRole: (userRole) => Promise<any>;
  displaySnackMessage: (message) => Promise<any>;
  match: {
    url: string
  };
  isLoading: boolean;
}

export interface UserRolesPageState {
  isModalOpen: boolean;
  resources: any[];
  permissions: any[];
  title: string;
  description: string;
  selectedRole: UserRole;
  showDeleteModal: boolean;
  isEditMode: boolean;
  isLoading: boolean;
  [key: string]: any;
  action: string;
  id: string;
}
