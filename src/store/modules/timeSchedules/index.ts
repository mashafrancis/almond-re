// thunks
import { displaySnackMessage } from '../snack';

// interfaces
import {
  AddScheduleActionRequest,
  AddScheduleActionSuccess,
  AddSchedulesActionFailure,
  DeleteScheduleActionFailure,
  DeleteScheduleActionRequest,
  DeleteScheduleActionSuccess,
  EditScheduleActionFailure,
  EditScheduleActionRequest,
  EditScheduleActionSuccess,
  GetAllSchedulesActionFailure,
  GetAllSchedulesActionRequest,
  GetAllSchedulesActionSuccess,
  GetPumpStatusActionFailure,
  GetPumpStatusActionRequest,
  GetPumpStatusActionSuccess,
  NewSchedule,
  Schedule,
  Status,
  TogglePumpStatusActionFailure,
  TogglePumpStatusActionRequest,
  TogglePumpStatusActionSuccess,
} from './interfaces';

// types
import {
  ADD_SCHEDULES_FAILURE,
  ADD_SCHEDULES_REQUEST,
  ADD_SCHEDULES_SUCCESS,
  DELETE_SCHEDULE_FAILURE,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_SUCCESS,
  EDIT_SCHEDULE_FAILURE,
  EDIT_SCHEDULE_REQUEST,
  EDIT_SCHEDULE_SUCCESS,
  GET_PUMP_STATUS_FAILURE,
  GET_PUMP_STATUS_REQUEST,
  GET_PUMP_STATUS_SUCCESS,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULES_FAILURE,
  TOGGLE_PUMP_STATUS_FAILURE,
  TOGGLE_PUMP_STATUS_REQUEST,
  TOGGLE_PUMP_STATUS_SUCCESS,
} from './types';
import { AnyAction } from "redux";
import { logActivity } from "@modules/activityLogs";

/**
 * Get all schedules request
 *
 * @returns {GetAllSchedulesActionRequest}
 */
export const getSchedulesRequest = (): GetAllSchedulesActionRequest => ({
  type: GET_SCHEDULE_REQUEST,
  isLoading: true,
});

/**
 * Get all schedules success
 *
 * @param {Schedule} schedules
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getSchedulesSuccess = (schedules: Schedule[]): GetAllSchedulesActionSuccess => ({
  schedules,
  type: GET_SCHEDULE_SUCCESS,
  isLoading: false,
});

/**
 * Get all schedules failure
 *
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getSchedulesFailure = (errors): GetAllSchedulesActionFailure => ({
  errors,
  type: GET_SCHEDULES_FAILURE,
  isLoading: false,
});

/**
 * Add a new schedule request
 *
 * @returns {AddScheduleActionRequest}
 */
export const addScheduleRequest = (): AddScheduleActionRequest => ({
  type: ADD_SCHEDULES_REQUEST,
  isLoading: true,
});

/**
 * Add new schedule success
 *
 * @param {NewSchedule} schedule
 * @returns {AddScheduleActionSuccess}
 */
export const addScheduleSuccess = (schedule: NewSchedule): AddScheduleActionSuccess => ({
  schedule,
  type: ADD_SCHEDULES_SUCCESS,
  isLoading: false,
});

/**
 * Add new schedule failure
 *
 * @returns {AddSchedulesActionFailure}
 */
export const addScheduleFailure = (errors): AddSchedulesActionFailure => ({
  errors,
  type: ADD_SCHEDULES_FAILURE,
});

/**
 * Delete single schedule request
 *
 * @returns {DeleteScheduleActionRequest}
 */
export const deleteSingleScheduleRequest = (): DeleteScheduleActionRequest => ({
  type: DELETE_SCHEDULE_REQUEST,
  isLoading: true,
});

/**
 * Delete single schedule success
 *
 * @returns {DeleteScheduleActionSuccess}
 * @param id
 */
export const deleteSingleScheduleSuccess = (id): DeleteScheduleActionSuccess => ({
  id,
  type: DELETE_SCHEDULE_SUCCESS,
  isLoading: false,
});

/**
 * Delete single schedule failure
 *
 * @returns {DeleteScheduleActionFailure}
 */
export const deleteSingleScheduleFailure = (errors): DeleteScheduleActionFailure => ({
  errors,
  type: DELETE_SCHEDULE_FAILURE,
});

/**
 * Edit a schedule request
 *
 * @returns {AddScheduleActionRequest}
 */
export const editScheduleRequest = (): EditScheduleActionRequest => ({
  type: EDIT_SCHEDULE_REQUEST,
  isLoading: true,
});

/**
 * Add new schedule success
 *
 * @param id
 * @param {Schedule} schedule
 * @returns {AddScheduleActionSuccess}
 */
export const editScheduleSuccess = (id, schedule: Schedule): EditScheduleActionSuccess => ({
  id,
  schedule,
  type: EDIT_SCHEDULE_SUCCESS,
  isLoading: false,
});

/**
 * Add edit schedule failure
 *
 * @returns {EditScheduleActionFailure}
 */
export const editScheduleFailure = (errors): EditScheduleActionFailure => ({
  errors,
  type: EDIT_SCHEDULE_FAILURE,
});

/**
 * Get all schedules request
 *
 * @returns {GetAllSchedulesActionRequest}
 */
export const togglePumpStatusRequest = (): TogglePumpStatusActionRequest => ({
  type: TOGGLE_PUMP_STATUS_REQUEST,
});

/**
 * Get all schedules success
 *
 * @returns {GetAllSchedulesActionSuccess}
 * @param enabled
 */
export const togglePumpStatusSuccess = (enabled: Status): TogglePumpStatusActionSuccess => ({
  enabled,
  type: TOGGLE_PUMP_STATUS_SUCCESS,
});

/**
 * Get all schedules failure
 *
 * @returns {GetAllSchedulesActionSuccess}
 */
export const togglePumpStatusFailure = (errors): TogglePumpStatusActionFailure => ({
  errors,
  type: TOGGLE_PUMP_STATUS_FAILURE,
});

/**
 * Get all schedules request
 *
 * @returns {GetAllSchedulesActionRequest}
 */
export const getPumpStatusRequest = (): GetPumpStatusActionRequest => ({
  type: GET_PUMP_STATUS_REQUEST,
});

/**
 * Get all schedules success
 *
 * @returns {GetAllSchedulesActionSuccess}
 * @param enabled
 */
export const getPumpStatusSuccess = (enabled: Status): GetPumpStatusActionSuccess => ({
  enabled,
  type: GET_PUMP_STATUS_SUCCESS,
});

/**
 * Get all schedules failure
 *
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getPumpStatusFailure = (errors): GetPumpStatusActionFailure => ({
  errors,
  type: GET_PUMP_STATUS_FAILURE,
});

/**
 * Thunk action creator
 * Get all schedules
 *
 * @returns {Function} action type and payload
 */
export const getAllSchedules = deviceId => (dispatch, getState, http) => {
  dispatch(getSchedulesRequest());
  return http.get(`/schedules?device=${deviceId}`)
    .then((response) => {
      dispatch(getSchedulesSuccess(response.data.data));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(getSchedulesFailure(message));
    });
};

/**
 * Thunk action creator
 * Add a new schedule
 *
 * @returns {Function} action type and payload
 */
export const addNewSchedule = schedule => (dispatch, getState, http) => {
  dispatch(addScheduleRequest());
  return http.post('schedules', schedule)
    .then((response) => {
      dispatch(addScheduleSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(addScheduleFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

/**
 * Thunk action creator
 * Delete a schedule
 *
 * @returns {Function} action type and payload
 */
export const deleteSingleSchedule = id => (dispatch, getState, http) => {
  dispatch(deleteSingleScheduleRequest());
  return http.delete(`schedules/${id}`)
    .then((response) => {
      dispatch(deleteSingleScheduleSuccess(id));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(deleteSingleScheduleFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

/**
 * Thunk action creator
 * Edit a schedule
 *
 * @returns {Function} action type and payload
 */
export const editSchedule = (id, schedule) => (dispatch, getState, http) => {
  dispatch(editScheduleRequest());
  return http.patch(`schedules/${id}`, schedule)
    .then((response) => {
      dispatch(editScheduleSuccess(id, response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(editScheduleFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

/**
 * Thunk action creator
 * Toggle a pump manually
 *
 * @returns {Function} action type and payload
 */
export const togglePump = status => (dispatch, getState, http) => {
  return http.patch('pump', status)
    .then((response) => {
      const data = response.data.data.scheduleOverride.enabled;
      // dispatch(getPumpStatusSuccess(data));
      dispatch(togglePumpStatusSuccess(data));
      dispatch(logActivity(response.data.data.activityHistory));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(displaySnackMessage(message));
    });
};

/**
 * Thunk action creator
 * Toggle a pump manually
 *
 * @returns {Function} action type and payload
 */
export const getPumpStatus = deviceId => (dispatch, getState, http) => {
  return http.get(`/pump?device=${deviceId}`)
    .then((response) => {
      const data = response.data.data[0].enabled;
      dispatch(getPumpStatusSuccess(data));
    })
    .catch(() => {
      // const message = 'Unable to turn the pump ON/OFF. Kindly check network connectivity.';
      dispatch(displaySnackMessage(''));
    });
};

/**
 * Thunk action creator
 * Set a pump manually
 *
 * @returns {Function} action type and payload
 */
export const toggleScheduleStatus = (id, enabled) => (dispatch, getState, http) => {
  return http.patch(`schedules/${id}`, enabled)
    .then((response) => {
      dispatch(editScheduleSuccess(id, response.data.data));
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(togglePumpStatusFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

export const schedulesInitialState = {
  schedules: [],
  enabled: false,
  isLoading: true,
  errors: {},
};

const reducer = (state: {
  schedules: Schedule[], enabled: boolean,isLoading: boolean, errors: object,
} = schedulesInitialState, action: AnyAction) => {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedules: action.schedules,
        errors: null,
        isLoading: action.isLoading,
      };
    case GET_SCHEDULES_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: action.isLoading,
      };
    case ADD_SCHEDULES_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ADD_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedules: [action.schedule, ...state.schedules],
        errors: null,
        isLoading: action.isLoading,
      };
    case ADD_SCHEDULES_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case DELETE_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedules: [...state.schedules].filter(schedule => action.id !== schedule._id),
        errors: null,
      };
    case DELETE_SCHEDULE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case EDIT_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case EDIT_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedules: [...state.schedules].map(schedule => schedule._id === action.schedule._id ? ({
          ...schedule,
          ...action.schedule,
        }) : schedule),
        errors: null,
      };
    case EDIT_SCHEDULE_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case TOGGLE_PUMP_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TOGGLE_PUMP_STATUS_SUCCESS:
      return {
        ...state,
        enabled: action.enabled,
        errors: null,
      };
    case TOGGLE_PUMP_STATUS_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case GET_PUMP_STATUS_REQUEST:
      return {
        ...state,
      };
    case GET_PUMP_STATUS_SUCCESS:
      return {
        ...state,
        enabled: action.enabled,
        errors: null,
      };
    case GET_PUMP_STATUS_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
