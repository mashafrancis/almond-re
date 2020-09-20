// react libraries
import React, { Suspense } from 'react';

// components
import {
	EnvironmentControlPage,
	mapDispatchToProps,
	mapStateToProps,
} from './index';
import { renderWithRouter } from '../../testHelpers';
import { props } from './fixtures';

describe('The EnvironmentalControl Page', () => {
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<EnvironmentControlPage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	describe('mapStateToProps', () => {
		const state = {
			sensorData: {
				environmentData: [],
			},
		};

		const props = mapStateToProps(state);

		it('should map environment control page props from state', () => {
			expect(props.environmentData).toEqual(state.sensorData.environmentData);
		});
	});

	describe('mapDispatchToProps', () => {
		let dispatch;
		let props;

		beforeEach(() => {
			dispatch = jest.fn();
			props = mapDispatchToProps(dispatch) as any;
		});

		afterEach(() => {
			dispatch = props = null;
		});

		// it('ensures getEnvironmentData is mapped to props', () => {
		//   props.getEnvironmentData();
		//   expect(dispatch).toHaveBeenCalled();
		// });

		it('ensures displaySnackMessage is mapped to props', () => {
			props.displaySnackMessage();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
