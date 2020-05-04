import { UserDetails } from '@modules/user/interfaces';
import { UserRole } from '@modules/userRoles/interfaces';

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
  updatePerson: (id, role) => Promise<any>;
}

export interface DashboardContainerState {
  isOpen: boolean;
  isMenuOpen: boolean;
  isLoading: boolean;
  isFeedbackMenuOpen: boolean;
  isFeedbackModal: boolean;
  isSelectDeviceModalOpen: boolean;
  device: string;
  activeDevice: {
    id: string;
    _id: string;
  };
  action: string;
  feedback: '';
  selectedIndex: {
    group: number;
    item: number
  };
  fields: {
    [key: string]: string | number
  };
  isChangeRoleDialogOpen: boolean;
  anchorEl: null | HTMLElement;
  roleSelected: string;
  roleId: string;
}
