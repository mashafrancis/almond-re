// react libraries
import { Suspense } from 'react';
// third party
import { screen } from '@testing-library/react';
// components
import { renderWithRouter } from '../../testHelpers';
import RegularUserAnalytics from './RegularUserAnalytics';
import AdminAnalytics from './AdminAnalytics';

describe('The Analytics Page', () => {
	it('should render Regular Analytics Page properly', () => {
		const sensorData = {
			temperature: 0,
			humidity: 0,
			waterLevel: 0,
		};
		const { asFragment } = renderWithRouter(
			<Suspense fallback={<h1>test loading</h1>}>
				<RegularUserAnalytics sensorData={sensorData} />
			</Suspense>,
		);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('regular-analytics-page');
		expect(elem).toHaveClass('analytics-page');
	});

	it('should render Admin Analytics Page properly', () => {
		const analyticsData = {
			devices: 0,
			users: 0,
		};
		const { asFragment } = renderWithRouter(
			<Suspense fallback={<h1>test loading</h1>}>
				<AdminAnalytics analyticsData={analyticsData} />
			</Suspense>,
		);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('admin-analytics-page');
		expect(elem).toHaveClass('analytics-page');
	});
});
