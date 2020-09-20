// react libraries
import React from 'react';

// third-party libraries
import { render, screen } from '@testing-library/react';

// component
import GeneralCardInfo from './index';

describe('GeneralCardInfo component', () => {
	const props = {
		mainHeader: 'mainHeader',
		subHeader: 'subHeader',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<GeneralCardInfo {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elemHeader = screen.getByTestId('heading');
		expect(elemHeader.innerHTML).toBe('mainHeader');

		const elemDetails = screen.getByTestId('sub-heading');
		expect(elemDetails.innerHTML).toBe('subHeader');
	});
});
