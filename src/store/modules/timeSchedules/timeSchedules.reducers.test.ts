// thunks
import {
  schedulesInitialState,
  reducer,
  getSchedulesRequest,
  getSchedulesSuccess,
  getSchedulesFailure,
  addScheduleRequest,
  addScheduleSuccess,
  addScheduleFailure,
  editScheduleRequest,
  editScheduleSuccess,
  editScheduleFailure,
  deleteSingleScheduleRequest,
  togglePumpStatusRequest,
  togglePumpStatusSuccess,
  togglePumpStatusFailure,
  deleteSingleScheduleSuccess,
  deleteSingleScheduleFailure,
  getPumpStatusRequest,
  getPumpStatusSuccess,
  getPumpStatusFailure
} from '@modules/timeSchedules/index';

// helpers
import {
  editSchedulePayload,
  enabledStatus,
  id,
  schedulePayload,
  timeSchedules,
} from '@modules/timeSchedules/fixtures';
import { errorMessage } from '../../../testHelpers';

describe('Time Schedules reducer: ', () => {
  const { data } = timeSchedules;

  it('should return initial state if action type doesn\'t match', () => {
    const newState = reducer(schedulesInitialState, { type: 'fakeType' })
    expect(newState).toEqual(schedulesInitialState);
  });

  describe('Get schedules', () => {
    it('should dispatch GET_SCHEDULE_REQUEST', () => {
      const getSchedulesRequestAction = getSchedulesRequest();
      const scheduleState = reducer(schedulesInitialState, getSchedulesRequestAction);

      expect(scheduleState.isLoading).toBeTruthy();
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch GET_SCHEDULE_SUCCESS', () => {
      const getSchedulesSuccessAction = getSchedulesSuccess(data);
      const scheduleState = reducer(schedulesInitialState, getSchedulesSuccessAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch GET_SCHEDULES_FAILURE', () => {
      const getSchedulesFailureAction = getSchedulesFailure(errorMessage);
      const scheduleState = reducer(schedulesInitialState, getSchedulesFailureAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.errors).toEqual(errorMessage);
    });
  });

  describe('Add schedules', () => {
    it('should dispatch ADD_SCHEDULES_REQUEST', () => {
      const addScheduleRequestAction = addScheduleRequest();
      const scheduleState = reducer(schedulesInitialState, addScheduleRequestAction);

      expect(scheduleState.isLoading).toBeTruthy();
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch ADD_SCHEDULES_SUCCESS', () => {
      const addScheduleSuccessAction = addScheduleSuccess(schedulePayload);
      const scheduleState = reducer(schedulesInitialState, addScheduleSuccessAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch ADD_SCHEDULES_FAILURE', () => {
      const addSchedulesFailureAction = addScheduleFailure(errorMessage);
      const scheduleState = reducer(schedulesInitialState, addSchedulesFailureAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.errors).toEqual(errorMessage);
    });
  });

  describe('Edit schedule', () => {
    it('should dispatch EDIT_SCHEDULE_REQUEST', () => {
      const editScheduleRequestAction = editScheduleRequest();
      const scheduleState = reducer(schedulesInitialState, editScheduleRequestAction);

      expect(scheduleState.isLoading).toBeTruthy();
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch EDIT_SCHEDULE_SUCCESS', () => {
      const schedulesInitialState = {
        schedules: timeSchedules.data,
      };

      const editScheduleSuccessAction = editScheduleSuccess('5ede17f7184ccf003a2da68f', editSchedulePayload);
      const scheduleState = reducer(schedulesInitialState as any, editScheduleSuccessAction);
      const updatedSchedule = scheduleState.schedules.find(schedule => schedule._id === editSchedulePayload._id);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(updatedSchedule.schedule).toEqual('2020-06-08T18:00:46.817Z')
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch EDIT_SCHEDULE_FAILURE', () => {
      const editSchedulesFailureAction = editScheduleFailure(errorMessage);
      const scheduleState = reducer(schedulesInitialState, editSchedulesFailureAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.errors).toEqual(errorMessage);
    });
  });

  describe('Delete schedule', () => {
    it('should dispatch DELETE_SCHEDULE_REQUEST', () => {
      const deleteScheduleRequestAction = deleteSingleScheduleRequest();
      const scheduleState = reducer(schedulesInitialState, deleteScheduleRequestAction);

      expect(scheduleState.isLoading).toBeTruthy();
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch DELETE_SCHEDULE_SUCCESS', () => {
      const schedulesInitialState = {
        schedules: timeSchedules.data,
      };

      const deleteScheduleSuccessAction = deleteSingleScheduleSuccess('5ede17f7184ccf003a2da68f');
      const scheduleState = reducer(schedulesInitialState as any, deleteScheduleSuccessAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.schedules.length).toBe(0);
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch DELETE_SCHEDULE_FAILURE', () => {
      const deleteScheduleFailureAction = deleteSingleScheduleFailure(errorMessage);
      const scheduleState = reducer(schedulesInitialState, deleteScheduleFailureAction);

      expect(scheduleState.isLoading).toBeFalsy();
      expect(scheduleState.errors).toEqual(errorMessage);
    });
  });

  describe('Toggle pump status', () => {
    it('should dispatch TOGGLE_PUMP_STATUS_REQUEST', () => {
      const togglePumpRequestAction = togglePumpStatusRequest();
      const scheduleState = reducer(schedulesInitialState, togglePumpRequestAction);

      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch TOGGLE_PUMP_STATUS_SUCCESS', () => {
      const togglePumpSuccessAction = togglePumpStatusSuccess(enabledStatus.enabled);
      const scheduleState = reducer(schedulesInitialState, togglePumpSuccessAction);

      expect(scheduleState.enabled).toEqual(enabledStatus.enabled);
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch TOGGLE_PUMP_STATUS_FAILURE', () => {
      const togglePumpFailureAction = togglePumpStatusFailure(errorMessage);
      const scheduleState = reducer(schedulesInitialState, togglePumpFailureAction);

      expect(scheduleState.errors).toEqual(errorMessage);
    });
  });

  describe('Get pump status', () => {
    it('should dispatch GET_PUMP_STATUS_REQUEST', () => {
      const getPumpStatusRequestAction = getPumpStatusRequest();
      const scheduleState = reducer(schedulesInitialState, getPumpStatusRequestAction);

      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch GET_PUMP_STATUS_SUCCESS', () => {
      const getPumpStatusSuccessAction = getPumpStatusSuccess(enabledStatus.enabled);
      const scheduleState = reducer(schedulesInitialState, getPumpStatusSuccessAction);

      expect(scheduleState.enabled).toEqual(enabledStatus.enabled);
      expect(scheduleState.errors).toBe(null);
    });

    it('should dispatch GET_PUMP_STATUS_FAILURE', () => {
      const getPumpStatusFailureAction = getPumpStatusFailure(errorMessage);
      const scheduleState = reducer(schedulesInitialState, getPumpStatusFailureAction);

      expect(scheduleState.errors).toEqual(errorMessage);
    });
  });
});
