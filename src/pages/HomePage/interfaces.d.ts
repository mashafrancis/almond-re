export interface HomePageProps {
  displaySnackMessage?: (message) => Promise<any>;
  socialAuthentication?: (payload) => Promise<any>;
}

export interface HomePageState {
  isLoading: boolean;
}
