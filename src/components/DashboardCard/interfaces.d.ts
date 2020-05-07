export interface DashboardCardProps {
  heading?: string;
  body: any;
  redirect?: (cardId: string) => void;
  actionItem?: any;
  classes: string;
}
