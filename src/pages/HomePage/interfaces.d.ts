import { UserDetails } from '@modules/user/interfaces';

export interface HomePageProps {
  displaySnackMessage?: (message) => Promise<any>;
  socialAuthentication?: () => Promise<any>;
  user?: UserDetails;
}
