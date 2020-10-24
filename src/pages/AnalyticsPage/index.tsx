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
import { AnalyticsPageProps } from '@pages/AnalyticsPage/interfaces';

export const AnalyticsPage = ({
	sensorData,
}: AnalyticsPageProps): JSX.Element => {
	const { isAdmin } = useContext(UserContext);

	return isAdmin ? (
		<AdminAnalytics />
	) : (
		<RegularUserAnalytics sensorData={sensorData} />
	);
};

export const mapStateToProps = (state) => ({
	error: state.error,
	sensorData: state.sensorData.sensorData,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
