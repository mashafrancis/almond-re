// react library
import { render, screen } from '@testing-library/react';

// components
import Loader from './index';

describe('Loader components', () => {
	it('should render correctly', () => {
		const { asFragment } = render(<Loader />);
		expect(asFragment()).toMatchSnapshot();

		const elemContainer = screen.getByTestId('container');
		expect(elemContainer).toHaveClass('container');

		const elem = screen.getByTestId('dot-1');
		expect(elem).toHaveClass('dot-1');
	});
});
