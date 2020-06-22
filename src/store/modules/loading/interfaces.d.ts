import {
  LOADING_ERROR,
  LOADING_REQUEST,
  LOADING_SUCCESS
} from '@modules/loading/types';

export interface LoadingRequest {
  type: LOADING_REQUEST;
  loading: string;
}

export interface LoadingSuccess {
  type: LOADING_SUCCESS;
  loading: string;
}

export interface LoadingError {
  type: LOADING_ERROR;
  loading: string;
}
