import { useContext, lazy } from 'react';

// components
import { Cell, Row } from '@material/react-layout-grid';
import {
	AccountBalanceTwoTone,
	LibraryBooksTwoTone,
	ScheduleTwoTone,
	DeviceHubTwoTone,
	AllOutTwoTone,
	GroupTwoTone,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';

const AnalyticsCard = lazy(() => import('@components/AnalyticsCard'));

const AdminAnalytics = (): JSX.Element => {
	const { setSelectedIndex } = useContext(ComponentContext);

	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<>
			<Row className="analytics-page" data-testid="admin-analytics-page">
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-blue"
						icon={<AllOutTwoTone className="content-icon" />}
						mainInfo="Devices"
						subInfo="10"
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-yellow"
						icon={<GroupTwoTone className="content-icon" />}
						mainInfo="People"
						subInfo="8"
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-purple"
						icon={<ScheduleTwoTone className="content-icon" />}
						mainInfo="Requests"
						subInfo="30"
					/>
				</Cell>
			</Row>
			<Row className="analytics-page">
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-red"
						icon={<AccountBalanceTwoTone className="content-icon" />}
						mainInfo="Sales"
						subInfo="400,000"
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(2)}
						colorClass="card-color-green"
						icon={<DeviceHubTwoTone className="content-icon" />}
						mainInfo="Units"
						subInfo="23"
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(3)}
						colorClass="card-color-brown"
						icon={<LibraryBooksTwoTone className="content-icon" />}
						mainInfo="Orders"
						subInfo="3"
					/>
				</Cell>
			</Row>
		</>
	);
};

export default AdminAnalytics;
