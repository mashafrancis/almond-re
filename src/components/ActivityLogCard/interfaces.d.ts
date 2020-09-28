export interface ActivityLogCardProps {
	log: string;
	date: Date | string;
	redirect?: (cardId: string) => void;
	classes?: string;
	type: string;
}
