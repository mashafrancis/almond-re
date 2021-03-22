import { useContext } from 'react';
// third-party libraries
import { connect } from 'react-redux';
// thunks
import { displaySnackMessage } from '@modules/snack';
import { UserContext } from '@context/UserContext';
// interfaces
import AdminAnalytics from '@pages/AnalyticsPage/AdminAnalytics';
import RegularUserAnalytics from '@pages/AnalyticsPage/RegularUserAnalytics';
import { AnalyticsPageProps } from '@pages/AnalyticsPage/interfaces';

export const AnalyticsPage = ({
	sensorData,
	analyticsData,
}: AnalyticsPageProps): JSX.Element => {
	const { isAdmin } = useContext(UserContext);

	return isAdmin ? (
		<AdminAnalytics analyticsData={analyticsData} />
	) : (
		<RegularUserAnalytics sensorData={sensorData} />
	);
};

export const mapStateToProps = (state) => ({
	error: state.error,
	sensorData: state.sensorData.sensorData,
	analyticsData: state.analytics.data,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
