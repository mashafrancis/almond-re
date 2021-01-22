// react libraries
import { Suspense } from 'react';

// components
import EnterDeviceIdTemplate from '@pages/EnterDeviceIdPage/Template';
import { mapDispatchToProps, mapStateToProps } from './index';
import { renderWithRouter } from '../../testHelpers';
import { props as appProps } from './fixtures';

describe('The EnterDeviceId Page', () => {
	let props;
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<EnterDeviceIdTemplate />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	describe('mapStateToProps function', () => {
		it('should return the expected props object', () => {
			const state = {
				device: {
					isLoading: false,
				},
			};
			props = mapStateToProps(state);
			expect(props.isLoading).toEqual(state.device.isLoading);
		});
	});

	describe('mapDispatchToState function', () => {
		let dispatch;

		beforeEach(() => {
			dispatch = jest.fn(() => Promise.resolve());
			props = mapDispatchToProps(dispatch);
		});

		it('should dispatch verifyUserDevice when it is called', () => {
			props.verifyUserDevice();
			expect(dispatch).toHaveBeenCalled();
		});

		it('should dispatch getUserDetails when it is called', () => {
			props.getUserDetails();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
