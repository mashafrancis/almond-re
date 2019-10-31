export interface ActivityLogCardProps {
  log: string;
  date: any;
  redirect?: (cardId: string) => void;
  classes?: string;
  type: string;
}
