// react libraries
import React, { Suspense } from 'react';

// components
import { mapDispatchToProps, mapStateToProps, QualityCheckPage } from './index';
import { renderWithRouter } from '../../testHelpers';

describe('The QualityCheck Page', () => {
	const props = {};
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<QualityCheckPage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	describe('mapStateToProps', () => {
		const state = {
			error: {
				error: '',
			},
		};

		const props = mapStateToProps(state);

		it('should map user prop from state', () => {
			expect(props.error).toEqual(state.error);
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

		it('ensures displaySnackMessage is mapped to props', () => {
			props.displaySnackMessage();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
