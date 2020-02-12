import { UserRole } from '@modules/userRoles/interfaces';
import { Permissions, Resources } from '@pages/UserRolesPage/interfaces';

export interface RolePageFormProps {
  registerUser: (user) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  getUserRoles: () => Promise<any>;
  createNewRole: (userRole) => Promise<any>;
  userRoles?: {
    data: UserRole[];
    permissions?: Permissions[];
    resources?: Resources[];
  };
}

export interface RolePageFormState {
  isLoading: boolean;
  isValid: boolean;
  fields: {
    [key: string]: string | number
  };
  errors: any;
  description?: string;
  title?: string;
  value?: string;
  resources: any[];
  permissions: any[];
  isRequestSent?: boolean;
}
