// react libraries
import React, { Suspense } from 'react';

import { render, screen } from '@testing-library/react';
import HomePage from './index';

describe.skip('Home Page', () => {
	it('should be rendered properly', () => {
		const { asFragment } = render(
			<Suspense fallback={<h1>test loading</h1>}>
				<HomePage />
			</Suspense>,
		);
		// expect(wrapper.find('button').exists).toBeTruthy();
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('homepage');
		expect(elem.classList[0]).toBe('background-cover');
	});

	// it('should render dashboard button which redirects to "/dashboard', () => {
	//   expect(wrapper.find('a[href="/dashboard"]')).toBeTruthy();
	// });
});
