// components
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage/index';
import { renderWithRedux } from '../../testHelpers';

// const initialState: {
//   isLoading: false;
// };

describe.skip('The EnterDeviceId Page', () => {
	const { asFragment } = renderWithRedux(<EnterDeviceIdPage />, {
		isLoading: false,
	});

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
