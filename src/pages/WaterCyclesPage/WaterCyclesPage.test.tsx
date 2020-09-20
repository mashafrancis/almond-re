// react libraries
import React, { Suspense } from 'react';

// components
import WaterCyclesPage from './Template';
import { renderWithRouter } from '../../testHelpers';
import { props } from './fixtures';

describe('The Water Cycles Page', () => {
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<WaterCyclesPage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
