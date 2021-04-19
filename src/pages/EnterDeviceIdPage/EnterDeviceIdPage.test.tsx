// react libraries
import { Suspense } from 'react';

// components
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage/index';
import { renderWithRouter } from '../../testHelpers';

describe('The EnterDeviceId Page', () => {
	let props;
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<EnterDeviceIdPage />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
