// react libraries
import { render, screen } from '@testing-library/react';

// component
import CardInfo from './index';
import { WindowSize } from '../../../testHelpers';

describe('CardInfo component', () => {
	const props = {
		mainHeader: 'mainHeader',
		subHeader: 'subHeader',
		buttonName: 'buttonName',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<CardInfo {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('header');
		expect(elem.innerHTML).toBe('mainHeader');
	});
});
