// react libraries
import { render, screen } from '@testing-library/react';

// components
import InternalServerErrorMessage from './index';

describe('Internal Server Error page', () => {
	const props = {
		errorButton: <div />,
	};

	it('should render the Internal Server Error components', () => {
		const { asFragment } = render(<InternalServerErrorMessage {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('internal-server-error');
		expect(elem).toHaveClass('server-error');

		const elemContent = screen.getByTestId('content');
		expect(elemContent.innerHTML).toBe(
			'We are experiencing an internal server problem.',
		);
	});
});
