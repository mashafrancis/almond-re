export interface HomePageProps {
  displaySnackMessage: (message) => Promise<any>;
  socialAuthentication?: () => Promise<any>;
}
