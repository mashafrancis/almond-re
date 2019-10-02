import * as firebase from '../../../utils/firebase';

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

const error = 'You are offline. Kindly check your internet connection';

/**
 * Get all schedules request
 *
 * @returns {GetAllSchedulesActionRequest}
 */
export const getSchedulesRequest = (): GetAllSchedulesActionRequest => ({
  type: GET_SCHEDULE_REQUEST,
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
});

/**
 * Get all schedules failure
 *
 * @returns {GetAllSchedulesActionSuccess}
 */
export const getSchedulesFailure = (errors): GetAllSchedulesActionFailure => ({
  errors,
  type: GET_SCHEDULES_FAILURE,
});

/**
 * Add a new schedule request
 *
 * @returns {AddScheduleActionRequest}
 */
export const addScheduleRequest = (): AddScheduleActionRequest => ({
  type: ADD_SCHEDULES_REQUEST,
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
  // dispatch(getSchedulesRequest());
  return http.get('almond.json')
    .then((response) => {
      const data = response.data;
      dispatch(getSchedulesSuccess(data));
      return data;
    })
    .catch(() => {
      dispatch(displaySnackMessage(error));
      dispatch(getSchedulesFailure(error));
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
  return http.post('almond.json', schedule)
    .then((response) => {
      dispatch(addScheduleSuccess(response.data.data));
      dispatch(displaySnackMessage('New time schedule has been added successfully.'));
      window.history.back();
    })
    .catch(() => {
      dispatch(displaySnackMessage(error));
      dispatch(addScheduleFailure(error));
    });
};

export const deleteSingleSchedule = id => (dispatch, getState, http) => {
  dispatch(deleteSingleScheduleRequest());
  // dispatch(displaySnackMessage('Deleting time schedule', true));
  // tslint:disable-next-line:prefer-template
  return firebase.firebaseDatabase.ref('almond/' + id)
    .remove()
    .then(() => {
      dispatch(deleteSingleScheduleSuccess(id));
      dispatch(displaySnackMessage('Time schedule deleted successfully', true));
    })
    .catch(() => {
      dispatch(displaySnackMessage(error));
      dispatch(deleteSingleScheduleFailure(error));
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
  return firebase.firebaseDatabase.ref()
    .child(`almond/${id}/`)
    .update(schedule)
    .then(() => {
      dispatch(editScheduleSuccess(id, schedule));
      dispatch(displaySnackMessage('Your schedule had been updated successfully.'));
      window.history.back();
    })
    .catch(() => {
      dispatch(editScheduleFailure(error));
      dispatch(displaySnackMessage(error));
    });
};

/**
 * Thunk action creator
 * Toggle a pump manually
 *
 * @returns {Function} action type and payload
 */
export const togglePump = status => (dispatch, getState, http) => {
  return firebase.firebaseDatabase.ref()
    .child(`almond-override`)
    .update(status)
    .then(() => {
      dispatch(addScheduleSuccess(status));
    })
    .catch(() => {
      dispatch(displaySnackMessage(error));
    });
};

/**
 * Thunk action creator
 * Set a pump manually
 *
 * @returns {Function} action type and payload
 */
export const getPumpStatus = () => (dispatch, getState, http) => {
  dispatch(getPumpStatusRequest());
  return firebase.firebaseDatabase.ref('/almond-override')
    .once('value')
    .then((snapshot) => {
      dispatch(getPumpStatusSuccess(snapshot.val()));
    })
    .catch(() => {
      dispatch(displaySnackMessage(error));
    });
};

export const schedulesInitialState = {
  data: [],
  schedules: [],
  isLoading: false,
  errors: {},
  status: { status: 'OFF' },
};

const reducer = (state = schedulesInitialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        data: action.schedules,
        errors: null,
        isLoading: false,
      };
    case GET_SCHEDULES_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case ADD_SCHEDULES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SCHEDULES_SUCCESS:
      return {
        ...state,
        errors: null,
        isLoading: false,
      };
    case ADD_SCHEDULES_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case DELETE_SCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.schedule,
        errors: null,
        isLoading: false,
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
        isLoading: true,
      };
    case EDIT_SCHEDULE_SUCCESS:
      return {
        ...state,
        errors: null,
        isLoading: false,
      };
    case EDIT_SCHEDULE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
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
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
