// react libraries
import { Suspense } from 'react';

// third party libraries
import { screen } from '@testing-library/react';

// components
import HomePage from '@pages/HomePage';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import DashboardContainer from '@pages/DashboardContainer';
import Routes from './index';
import { renderWithRedux, renderWithRouter } from '../testHelpers';

describe('The Route components', () => {
	const initialState = {};
	const props = {};

	// it('should register a route for the / page', () => {
	//   mountWithRedux(
	//     <Suspense fallback={<h1>test loading</h1>}>
	//       <HomePage />
	//     </Suspense>,
	//     initialState,
	//   );
	//   expect(screen.getByTestId('homepage-content')).toHaveTextContent('We have an idea!');
	// });

	it.skip('should register a route for dashboard', () => {
		const route = '/dashboard';
		renderWithRedux(
			<Suspense fallback={<h1>test loading</h1>}>
				<DashboardContainer {...(props as any)} />
			</Suspense>,
			initialState,
		);
		const elem = screen.getByTestId('dashboard');
		expect(elem).toHaveClass('dashboard');
		// expect(screen.getByTestId('dashboard').textContent).toBe('Cinema Booking')
		// expect(wrapper.find({ path: '/dashboard' }).length).toBe(1);
	});
	//
	// it('should register a route for my-device', () => {
	//   expect(wrapper.find({ path: '/my-device' }).length).toBe(1);
	// });
	//
	// it('should register a route for 404', () => {
	//   expect(wrapper.find({ path: '/404' }).length).toBe(1);
	// });
});
