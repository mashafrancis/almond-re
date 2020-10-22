// react libraries
import { Suspense } from 'react';

// components
import { SettingsPage, mapDispatchToProps, mapStateToProps } from './index';
import { renderWithRouter } from '../../testHelpers';

describe('The Settings page', () => {
	const props = {
		displaySnackMessage: jest.fn(() => Promise.resolve()),
		match: {
			url: '/',
		},
	};

	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<SettingsPage {...props} />
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

		it('should map settings page props from state', () => {
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
