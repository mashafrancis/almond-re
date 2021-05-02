// react libraries
import { Suspense } from 'react';

import { render, screen } from '@testing-library/react';
import HomePage from './index';

describe.skip('Home Page', () => {
	it('should be rendered properly', () => {
		const { asFragment } = render(<HomePage />);
		// expect(wrapper.find('button').exists).toBeTruthy();
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('homepage');
		expect(elem).toHaveClass('homepage');
	});

	// it('should render dashboard button which redirects to "/dashboard', () => {
	//   expect(wrapper.find('a[href="/dashboard"]')).toBeTruthy();
	// });
});
