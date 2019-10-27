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
  Schedule,
  Status,
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
} from './types';

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
 * @param {Schedule} schedule
 * @returns {AddScheduleActionSuccess}
 */
export const addScheduleSuccess = (schedule: Schedule): AddScheduleActionSuccess => ({
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
export const getPumpStatusRequest = (): GetPumpStatusActionRequest => ({
  type: GET_PUMP_STATUS_REQUEST,
});

/**
 * Get all schedules success
 *
 * @returns {GetAllSchedulesActionSuccess}
 * @param status
 */
export const getPumpStatusSuccess = (status: Status): GetPumpStatusActionSuccess => ({
  status,
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

// actions
/**
 * Thunk action creator
 * Get all schedules
 *
 * @returns {Function} action type and payload
 */
export const getAllSchedules = () => (dispatch, getState, http) => {
  dispatch(getSchedulesRequest());
  return http.get('/schedules')
    .then((response) => {
      const data = response.data.data;
      dispatch(getSchedulesSuccess(data));
      return data;
    })
    .catch((error) => {
      const message = error.response.data.message;
      // dispatch(displaySnackMessage(message));
      dispatch(getSchedulesFailure(message));
    });
};

/**
 * Thunk action creator
 * Add a new schedules
 *
 * @returns {Function} action type and payload
 */
export const addNewSchedule = schedule => (dispatch, getState, http) => {
  dispatch(addScheduleRequest());
  return http.post('schedules', schedule)
    .then((response) => {
      dispatch(addScheduleSuccess(response.data.data));
      dispatch(displaySnackMessage(response.data.message));
      window.history.back();
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(addScheduleFailure(message));
      dispatch(displaySnackMessage(message));
    });
};

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
 * Add a new schedules
 *
 * @returns {Function} action type and payload
 */
export const editSchedule = (id, schedule) => (dispatch, getState, http) => {
  dispatch(editScheduleRequest());
  return http.patch(`schedules/${id}`, schedule)
    .then((response) => {
      dispatch(editScheduleSuccess(id, response.data.data));
      dispatch(displaySnackMessage(response.data.message));
      window.history.back();
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
  return http.post('pump', status)
    .then((response) => {
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      const message = error.response.data.message;
      dispatch(displaySnackMessage(message));
    });
};

/**
 * Thunk action creator
 * Set a pump manually
 *
 * @returns {Function} action type and payload
 */
export const getPumpStatus = () => (dispatch, getState, http) => {
  // dispatch(getPumpStatusRequest());
  return console.log('Class: , Function: , Line 290 ON():', 'ON');
};

export const schedulesInitialState = {
  data: [],
  schedules: [],
  isLoading: true,
  errors: {},
  status: { status: 'OFF' },
};

const reducer = (state = schedulesInitialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        data: action.schedules,
        errors: null,
        isLoading: action.isLoading,
      };
    case GET_SCHEDULES_FAILURE:
      return {
        ...state,
        data: action.schedules,
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
        schedule: action.schedule,
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
        errors: null,
      };
    case EDIT_SCHEDULE_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case GET_PUMP_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PUMP_STATUS_SUCCESS:
      return {
        ...state,
        status: action.status,
        errors: null,
        isLoading: false,
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
