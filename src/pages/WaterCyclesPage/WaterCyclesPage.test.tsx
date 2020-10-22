// react libraries
import { Suspense } from 'react';

// components
import WaterCyclesTemplate from './Template';
import { renderWithRouter } from '../../testHelpers';
import { props } from './fixtures';

describe('The Water Cycles Page', () => {
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<WaterCyclesTemplate {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
