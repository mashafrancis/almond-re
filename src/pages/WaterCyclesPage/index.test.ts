import {
	mapDispatchToProps,
	mapStateToProps,
} from '@pages/WaterCyclesPage/index';

describe('mapStateToProps', () => {
	const state = {
		timeSchedules: {
			schedules: [],
			status: '',
			isLoading: true,
			enabled: true,
		},
		user: {
			devices: [],
		},
		sensorData: {
			waterData: [],
		},
	};

	const props = mapStateToProps(state);

	it('should map water cycles page props from state', () => {
		expect(props.schedules).toEqual(state.timeSchedules.schedules);
		expect(props.devices).toEqual(state.user.devices);
		expect(props.enabled).toEqual(state.timeSchedules.enabled);
		expect(props.status).toEqual(state.timeSchedules.status);
		expect(props.isLoading).toEqual(state.timeSchedules.isLoading);
		expect(props.user).toEqual(state.user);
		expect(props.waterData).toEqual(state.sensorData.waterData);
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

	it('ensures addNewSchedule is mapped to props', () => {
		props.addNewSchedule();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures editSchedule is mapped to props', () => {
		props.editSchedule();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures deleteSingleSchedule is mapped to props', () => {
		props.deleteSingleSchedule();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures displaySnackMessage is mapped to props', () => {
		props.displaySnackMessage();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures getAllSchedules is mapped to props', () => {
		props.getAllSchedules();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures getPumpStatus is mapped to props', () => {
		props.getPumpStatus();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures togglePump is mapped to props', () => {
		props.togglePump();
		expect(dispatch).toHaveBeenCalled();
	});

	it('ensures toggleScheduleStatus is mapped to props', () => {
		props.toggleScheduleStatus();
		expect(dispatch).toHaveBeenCalled();
	});

	// it('ensures getWaterData is mapped to props', () => {
	//   props.getWaterData();
	//   expect(dispatch).toHaveBeenCalled();
	// });
});
