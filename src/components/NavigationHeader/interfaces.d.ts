import { History } from 'history';

export interface NavigationHeaderProps {
  forwardButtonName: string;
  backwardButtonName: string;
  forwardLink: string | any;
  backwardLink: any;
  history?: History;
}
