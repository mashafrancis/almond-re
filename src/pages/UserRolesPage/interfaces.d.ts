import { UserRole } from '@modules/userRoles/interfaces';

export interface UserRolesPageProps {
  userRoles: {
    data: UserRole[];
    permissions?: Permissions[];
    resources?: Resources[];
  };
  getUserRoles: () => Promise<any>;
  deleteUserRole: (id) => Promise<any>;
  editUserRole: (userRole: UserRole) => Promise<any>;
  createNewRole: (userRole) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
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

export interface Permissions {
  _id: string;
  type: string;
}

export interface Resources {
  _id: string;
  name: string;
}
