import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// components
import {
	AccountBalanceTwoTone,
	LibraryBooksTwoTone,
	ScheduleTwoTone,
	DeviceHubTwoTone,
	AllOutTwoTone,
	GroupTwoTone,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AnalyticsCard from '@components/AnalyticsCard';
import { AdminUserAnalyticsProps } from '@pages/AnalyticsPage/interfaces';
import { getAdminStatistics } from '@modules/analytics';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	}),
);

const AdminAnalytics = ({
	analyticsData,
}: AdminUserAnalyticsProps): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAdminStatistics());
	}, []);

	const { setSelectedIndex } = useContext(ComponentContext);
	const handleCardClick = (index: number) => () => setSelectedIndex(index);
	console.log(
		'Class: , Function: AdminAnalytics, Line 31 analyticsData():',
		analyticsData,
	);

	return (
		<div className={classes.root} data-testid="admin-analytics-page">
			<Grid
				container
				item
				xs={12}
				spacing={2}
				style={{ margin: 0, padding: 0 }}
			>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="card-color-blue"
					icon={<AllOutTwoTone fontSize="large" />}
					mainInfo="Devices"
					subInfo={analyticsData.devices}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="card-color-yellow"
					icon={<GroupTwoTone fontSize="large" />}
					mainInfo="People"
					subInfo={analyticsData.users}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="card-color-purple"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Requests"
					subInfo="30"
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="card-color-red"
					icon={<AccountBalanceTwoTone fontSize="large" />}
					mainInfo="Sales"
					subInfo="400,000"
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="card-color-green"
					icon={<DeviceHubTwoTone fontSize="large" />}
					mainInfo="Units"
					subInfo="23"
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="card-color-brown"
					icon={<LibraryBooksTwoTone fontSize="large" />}
					mainInfo="Orders"
					subInfo="3"
				/>
			</Grid>
		</div>
	);
};

export default AdminAnalytics;
