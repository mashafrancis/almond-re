// react libraries
import { render, screen } from '@testing-library/react';
import ActionButton from './index';

describe('ActionButton component', () => {
	const props = {
		name: 'Button',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<ActionButton variant="text" {...props} />);
		expect(asFragment()).toMatchSnapshot();
		expect(screen.getByText('Button')).toBeTruthy();
	});
});
