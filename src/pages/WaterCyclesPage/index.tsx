// thunks
import {
	addNewSchedule,
	deleteSingleSchedule,
	editSchedule,
	getAllSchedules,
	getPumpStatus,
	togglePump,
	toggleScheduleStatus,
} from '@modules/timeSchedules';
import { displaySnackMessage } from '@modules/snack';
import { connect } from 'react-redux';
import WaterCyclesPage from '@pages/WaterCyclesPage/Template';

export const mapStateToProps = (state) => ({
	schedules: state.timeSchedules.schedules,
	status: state.timeSchedules.status,
	isLoading: state.timeSchedules.isLoading,
	enabled: state.timeSchedules.enabled,
	devices: state.user.devices,
	user: state.user,
	waterData: state.sensorData.waterData,
});

export const mapDispatchToProps = (dispatch) => ({
	addNewSchedule: (schedule) => dispatch(addNewSchedule(schedule)),
	editSchedule: (scheduleId, schedule) =>
		dispatch(editSchedule(scheduleId, schedule)),
	deleteSingleSchedule: (scheduleId) =>
		dispatch(deleteSingleSchedule(scheduleId)),
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
	getAllSchedules: (deviceId) => dispatch(getAllSchedules(deviceId)),
	getPumpStatus: (deviceId) => dispatch(getPumpStatus(deviceId)),
	togglePump: (payload) => dispatch(togglePump(payload)),
	toggleScheduleStatus: (scheduleId, payload) =>
		dispatch(toggleScheduleStatus(scheduleId, payload)),
	// getWaterData: () => dispatch(getWaterData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
