// react libraries
import { Suspense } from 'react';

// components
import { HelpPage } from './index';
import { renderWithRouter } from '../../testHelpers';

describe('The HelpPage', () => {
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<HelpPage />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
