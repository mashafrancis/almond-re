export interface AnalyticsCardProps {
  icon?: any; //:TODO: Icon should have a type interface
  mainInfo: string;
  subInfo: string;
  colorClass?: string;
  onClick?: () => void;
}
