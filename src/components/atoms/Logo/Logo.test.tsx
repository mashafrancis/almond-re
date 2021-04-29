// react library
import { render, screen } from '@testing-library/react';

// components
import Logo from './index';

describe.skip('Logo component', () => {
	it('should render correctly', () => {
		const { asFragment } = render(<Logo themeMode="light" />);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('logo');
		expect(elem).toHaveClass('main-logo');
	});
});
