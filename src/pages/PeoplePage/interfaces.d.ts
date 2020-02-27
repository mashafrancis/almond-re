import { UserDetails } from '@modules/user/interfaces';
import { UserRole } from '@modules/userRoles/interfaces';

export interface PeoplePageProps {
  getAllPeople: () => Promise<any>;
  getUserRoles: () => Promise<any>;
  people: UserDetails[];
  roles: UserRole[];
  updatePerson: (id, role) => Promise<any>;
}

export interface PeoplePageState {
  people: any;
  isFetchingRoles: boolean;
  isSelectOpen: boolean;
  roleSelect: string;
  userId: string;
  roleId: string;
}
