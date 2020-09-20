import { History } from 'history';

export interface NavigationHeaderProps {
	forwardButtonName: string;
	backwardButtonName: string;
	forwardLink: string;
	backwardLink: string;
	history?: History;
}
