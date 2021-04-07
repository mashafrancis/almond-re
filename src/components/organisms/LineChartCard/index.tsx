import { lazy } from 'react';
import SelectBox from '@components/SelectBox';
import DateRangePicker from '@components/DateRangePicker';
// utils
import dayjs from '@utils/dayjsTime';
import { BlankContent } from '@pages/WaterCyclesPage';
import DashboardCard from '@components/DashboardCard';
import AreaChardDisplay from '@components/AreaChartDisplay';
// interfaces
import { LineChartCardProps } from '@components/organisms/LineChartCard/intefaces';

const dateSelectOptions = [
	{
		value: 'This Week',
		label: 'This Week',
	},
	{
		value: 'This Month',
		label: 'This Month',
	},
	{
		value: 'This Year',
		label: 'This Year',
	},
	{
		value: 'Quarterly',
		label: 'Quarterly',
	},
	{
		value: 'Pick a date',
		label: 'Pick a date',
	},
];

const LineChartCard = ({
	heading,
	selectedValue,
	handleDateSelect,
	isDateRangeHidden,
	onDateRangeChange,
	handleDateRangeModal,
	data,
}: LineChartCardProps): JSX.Element => {
	const formatTime = (time: string) => {
		switch (selectedValue) {
			case 'Today':
				return dayjs(time).format('H');
			case 'This Week':
				return dayjs(time).format('ddd');
			case 'This Month':
				return dayjs(time).format('D');
			case 'This Year':
				return dayjs(time).format('M');
		}
	};
	const labels = data.map((element) => formatTime(element.time));
	const chartData = data.map((element) => Number(element.mean));

	// const labels = () => {
	//   switch (selectedValue) {
	//     case "Today":
	//       return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
	//     case "This Week":
	//       return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
	//   }
	// }

	return (
		<DashboardCard
			heading={heading}
			body={
				data.length !== 0 ? (
					<AreaChardDisplay
						backgroundColor="rgba(25, 103, 210, 0.2)"
						chartColor="#1967D2"
						chartData={chartData}
						labels={labels}
					/>
				) : (
					<BlankContent message="No data to display" />
				)
			}
			actionItem={
				<>
					<SelectBox
						title="select date"
						selectedValue={selectedValue}
						handleDateSelect={handleDateSelect}
						options={dateSelectOptions}
					/>
					<div className={`${isDateRangeHidden && 'hide'}`}>
						<DateRangePicker
							isOpen={!isDateRangeHidden}
							onChange={onDateRangeChange}
							onClose={handleDateRangeModal}
							onDismiss={handleDateRangeModal}
						/>
					</div>
				</>
			}
		/>
	);
};

export default LineChartCard;
