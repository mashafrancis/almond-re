// react libraries
import { Suspense } from 'react';

// third party
import { render, screen } from '@testing-library/react';

// components
import {
	DeviceManagementPage,
	mapDispatchToProps,
	mapStateToProps,
} from './index';
import { props } from './fixtures';

describe('The DeviceManagement Page', () => {
	const { asFragment } = render(
		<Suspense fallback={<h1>test loading</h1>}>
			<DeviceManagementPage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('device-management-page');
		expect(elem).toHaveClass('device-management-page');
	});

	describe('mapStateToProps', () => {
		const state = {
			device: {
				devices: [],
				activeDevice: '',
			},
		};

		const props = mapStateToProps(state);

		it('should map props from state', () => {
			expect(props.devices).toEqual(state.device.devices);
			expect(props.activeDevice).toEqual(state.device.activeDevice);
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

		it('ensures getAllDevices is mapped to props', () => {
			props.getAllDevices();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures addNewDevice is mapped to props', () => {
			props.addNewDevice();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures editDevice is mapped to props', () => {
			props.editDevice();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures deleteDevice is mapped to props', () => {
			props.deleteDevice();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
