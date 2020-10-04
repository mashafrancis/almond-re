// react libraries
import React from 'react';

// third-party libraries
import { render } from '@testing-library/react';
import CheckBox from './index';

describe('CheckBox component', () => {
	it('should render correctly', () => {
		const { asFragment } = render(<CheckBox />);
		expect(asFragment()).toMatchSnapshot();
	});
});
