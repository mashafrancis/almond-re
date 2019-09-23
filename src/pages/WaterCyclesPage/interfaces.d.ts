export interface WaterCyclesPageProps {
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
}

export interface WaterCyclesPageState {
  isLoading: boolean;
}
