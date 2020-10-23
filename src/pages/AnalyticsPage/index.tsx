import { useContext } from 'react';

// third-party libraries
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { UserContext } from '@context/UserContext';

// styles
import './AnalyticsPage.scss';

// interfaces
import AdminAnalytics from '@pages/AnalyticsPage/AdminAnalytics';
import RegularUserAnalytics from '@pages/AnalyticsPage/RegularUserAnalytics';
import { AnalyticsPageProps } from './interfaces';

export const AnalyticsPage = (props: AnalyticsPageProps): JSX.Element => {
	const user = useContext(UserContext);

	return user.isAdmin ? <AdminAnalytics /> : <RegularUserAnalytics />;
};

export const mapStateToProps = (state) => ({
	error: state.error,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
