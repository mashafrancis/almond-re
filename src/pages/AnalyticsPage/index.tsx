import { useContext } from 'react';
// third-party libraries
import { connect } from 'react-redux';
// thunks
import { displaySnackMessage } from '@modules/snack';
import { getAllSchedules } from '@modules/timeSchedules';
import { UserContext } from '@context/UserContext';
// styles
import './AnalyticsPage.scss';
// interfaces
import AdminAnalytics from '@pages/AnalyticsPage/AdminAnalytics';
import RegularUserAnalytics from '@pages/AnalyticsPage/RegularUserAnalytics';
import { AnalyticsPageProps } from '@pages/AnalyticsPage/interfaces';

export const AnalyticsPage = ({
	sensorData,
	getAllSchedules,
	timeSchedules,
}: AnalyticsPageProps): JSX.Element => {
	const { isAdmin } = useContext(UserContext);
	return isAdmin ? (
		<AdminAnalytics />
	) : (
		<RegularUserAnalytics
			timeSchedules={timeSchedules}
			getAllSchedules={getAllSchedules}
			sensorData={sensorData}
		/>
	);
};

export const mapStateToProps = (state) => ({
	error: state.error,
	sensorData: state.sensorData.sensorData,
	timeSchedules: state.timeSchedules.schedules,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
	getAllSchedules: (id) => dispatch(getAllSchedules(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
