export interface HomePageProps {
  displaySnackMessage?: (message) => Promise<any>;
  socialAuthentication?: () => Promise<any>;
}

export interface HomePageState {
  isLoading: boolean;
}
