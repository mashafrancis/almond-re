export interface AnalyticsPageProps {
  match: {
    url: string
  };
}

export interface AnalyticsPageState {
}

export interface IData {
  temp: number;
  humid: number;
  water_level: number;
}

export interface RegularUserAnalyticsState {
  data: IData
  lastMessage: any;
}
