import { UserDetails } from '@modules/user/interfaces';
import { UserRole } from '@modules/userRoles/interfaces';
import { ActivityLogs } from '@modules/activityLogs/interfaces';

export interface DashboardContainerProps {
  drawerEl?: object;
  match?: {
    url: string;
  };
  history: {
    push: (url: string) => void;
  };
  component?: any;
  user: UserDetails;
  logoutUser: () => void;
  title: string;
  activateDevice: (id) => Promise<any>;
  getUserDetails: () => Promise<any>;
  activeDevice: {
    id: string;
    _id: string;
    verified?: boolean;
    user?: UserDetails;
  };
  roles: UserRole[];
  editUserDetails: (id, role) => Promise<any>;
  activityLogs: ActivityLogs[];
  loading: string;
}

export interface DashboardContainerState {
  isOpen: boolean;
  isLoading: boolean;
  isFeedbackMenuOpen: boolean;
  isFeedbackModal: boolean;
  device: string;
  activeDevice: {
    id: string;
    _id: string;
  };
  action: string;
  feedback: '';
  fields: {
    [key: string]: string | number
  };
  isChangeRoleDialogOpen: boolean;
  anchorEl: null | HTMLElement;
  roleSelected: string;
  roleId: string;
}
