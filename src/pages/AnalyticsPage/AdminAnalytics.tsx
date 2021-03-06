import { useContext, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
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
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { AnalyticsCard } from '@components/molecules';
import { getAdminStatistics } from '@modules/analytics';
import { IRootState } from '../../store/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	}),
);

const AdminAnalytics = (): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { users, devices } = useSelector(
		(globalState: IRootState) => globalState.analytics.data,
		shallowEqual,
	);

	useEffect(() => {
		dispatch(getAdminStatistics());
	}, []);

	const { setSelectedIndex } = useContext(ComponentContext);
	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<div className={classes.root} data-testid="admin-analytics-page">
			<Grid container item xs={12} spacing={2}>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="blueCard"
					icon={<AllOutTwoTone fontSize="large" />}
					mainInfo="Devices"
					subInfo={devices}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="yellowCard"
					icon={<GroupTwoTone fontSize="large" />}
					mainInfo="People"
					subInfo={users}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="purpleCard"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Requests"
					subInfo="30"
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="redCard"
					icon={<AccountBalanceTwoTone fontSize="large" />}
					mainInfo="Sales"
					subInfo="400,000"
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="greenCard"
					icon={<DeviceHubTwoTone fontSize="large" />}
					mainInfo="Units"
					subInfo="23"
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="brownCard"
					icon={<LibraryBooksTwoTone fontSize="large" />}
					mainInfo="Orders"
					subInfo="3"
				/>
			</Grid>
		</div>
	);
};

export default AdminAnalytics;
