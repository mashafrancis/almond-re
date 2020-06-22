import { EnvironmentData } from '@modules/sensorData/interfaces';

export interface EnvironmentControlPageProps {
  getEnvironmentData: () => Promise<any> | any;
  environmentData: EnvironmentData
}

export interface EnvironmentControlPageState {
  environmentData: any;
}
