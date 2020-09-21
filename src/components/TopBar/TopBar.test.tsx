// react libraries
import React from 'react';

// third-party libraries
import { screen } from '@testing-library/react';

// component
import TopBar from './index';
import { renderWithRouter } from '../../testHelpers';

describe.skip('TopBar component', () => {
	const props = {
		photoImage: '',
		openProfileDialog: jest.fn,
		isActivityLogsEmpty: true,
	};

	const { asFragment } = renderWithRouter(<TopBar {...props} />);

	it('should render correctly', () => {
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('top-bar');
		expect(elem.classList[5]).toBe('mdc-top-app-bar');
	});
});
