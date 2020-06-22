import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { UserContext } from '@utils/context';

// styles
import './AnalyticsPage.scss';

// interfaces
import {
  AnalyticsPageProps,
  AnalyticsPageState
} from './interfaces';
import AdminAnalytics from '@pages/AnalyticsPage/AdminAnalytics';
import RegularUserAnalytics from '@pages/AnalyticsPage/RegularUserAnalytics';

export const AnalyticsPage: React.FunctionComponent<AnalyticsPageProps> = props => {
  const [state, setState] = React.useState<AnalyticsPageState>({
    isEditMode: false,
    schedules: [],
    isDeleteModal: false,
    action: '',
    id: '',
    statusClass: '',
    isEnabled: false,
  });

  const user = React.useContext(UserContext);

  return (
    user.isAdmin ? <AdminAnalytics /> : <RegularUserAnalytics />
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
