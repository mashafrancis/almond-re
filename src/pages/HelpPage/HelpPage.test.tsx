// react libraries
import { Suspense } from 'react';

// components
import { HelpPage, mapDispatchToProps, mapStateToProps } from './index';
import { renderWithRouter } from '../../testHelpers';

describe('The HelpPage', () => {
	const props = {
		displaySnackMessage: jest.fn(() => Promise.resolve()),
	};

	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<HelpPage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	describe('mapStateToProps', () => {
		const state = {
			error: '',
		};

		const props = mapStateToProps(state);

		it('should map help page props from state', () => {
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
