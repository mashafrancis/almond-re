// react libraries
import { render } from '@testing-library/react';

// component
import FormField from './index';

describe('FormField component', () => {
	const props = {
		required: true,
		InputProps: <div>test</div>,
	};

	it('should render correctly', () => {
		const { asFragment, getByTestId } = render(<FormField {...props} />);
		expect(asFragment()).toMatchSnapshot();

		// const fieldInput = getByTestId('field-input');
		// expect(fieldInput).toBe('')
	});
});
