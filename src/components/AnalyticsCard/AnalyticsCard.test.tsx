// react libraries
import React from 'react';

// third-party libraries
import { render, screen } from '@testing-library/react';

// component
import AnalyticsCard from './index';

describe('AnalyticsCard component', () => {
	const props = {
		mainInfo: 'mainInfo',
		subInfo: 'subInfo',
	};

	const { asFragment } = render(<AnalyticsCard {...props} />);

	it('should render correctly', () => {
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('analytics-card');
		expect(elem.classList[0]).toBe('analytics-card');
	});
});
