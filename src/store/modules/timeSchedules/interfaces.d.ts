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

export interface GetAllSchedulesActionRequest {
  type: GET_SCHEDULE_REQUEST;
}

export interface GetAllSchedulesActionSuccess {
  schedules: Schedule[];
  type: GET_SCHEDULE_SUCCESS;
}

export interface GetAllSchedulesActionFailure {
  type: GET_SCHEDULES_FAILURE;
  errors: any;
}

export interface AddScheduleActionRequest {
  type: ADD_SCHEDULES_REQUEST;
}

export interface AddScheduleActionSuccess {
  schedule: NewSchedule;
  type: ADD_SCHEDULES_SUCCESS;
}

export interface AddSchedulesActionFailure {
  type: ADD_SCHEDULES_FAILURE;
  errors: any;
}

export interface DeleteScheduleActionRequest {
  type: DELETE_SCHEDULE_REQUEST;
}

export interface DeleteScheduleActionSuccess {
  id: string;
  type: DELETE_SCHEDULE_SUCCESS;
}

export interface DeleteScheduleActionFailure {
  type: DELETE_SCHEDULE_FAILURE;
  errors: any;
}

export interface EditScheduleActionRequest {
  type: EDIT_SCHEDULE_REQUEST;
}

export interface EditScheduleActionSuccess {
  id: string;
  schedule: NewSchedule;
  type: EDIT_SCHEDULE_SUCCESS;
}

export interface EditScheduleActionFailure {
  type: EDIT_SCHEDULE_FAILURE;
  errors: any;
}

export interface GetPumpStatusActionRequest {
  type: GET_PUMP_STATUS_REQUEST;
}

export interface GetPumpStatusActionSuccess {
  status: Status;
  type: GET_PUMP_STATUS_SUCCESS;
}

export interface GetPumpStatusActionFailure {
  type: GET_PUMP_STATUS_FAILURE;
  errors: any;
}

export interface Schedule {
  id?: string;
  time: string;
}

export interface Status {
  status: string;
}

export interface NewSchedule {
  time: string;
}
