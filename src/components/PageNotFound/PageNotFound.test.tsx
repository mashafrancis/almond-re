// react library
import { render, screen } from '@testing-library/react';

// components
import PageNotFound from './index';

const props = {
	history: { goBack: jest.fn() },
};

describe('PageNotFound components', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<PageNotFound {...props} />);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render the Page Not Found components', () => {
		render(<PageNotFound {...props} />);
		const elem = screen.getByTestId('notfound');

		expect(elem.classList[0]).toBe('notfound');
	});
});
