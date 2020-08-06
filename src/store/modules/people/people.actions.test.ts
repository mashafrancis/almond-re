// thunks
import {
  getAllPeople,
  peopleInitialState, updatePerson,
} from '@modules/people';

// types
import {
  GET_ALL_PEOPLE_FAILURE,
  GET_ALL_PEOPLE_SUCCESS, UPDATE_PERSON_DETAILS_FAILURE, UPDATE_PERSON_DETAILS_SUCCESS,
} from '@modules/people/types';

import {
  LOADING_ERROR,
  LOADING_REQUEST,
  LOADING_SUCCESS,
} from '@modules/loading/types';

// helpers
import {
  axiosMock,
  dispatchMethodMock,
  reduxMockStore,
} from '../../../testHelpers';
import { peopleResponse, personToUpdate } from '@modules/people/fixtures';
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';


describe('People module actions', () => {
  describe('Get people thunk', () => {
    it('should fetch and return all people', () => {
      const mockResponse = {
        data: {
          data: peopleResponse.data,
        },
      };
      const expectedActions = [
        {
          type: LOADING_REQUEST,
          loading: 'requesting',
        },
        {
          people: mockResponse.data.data,
          type: GET_ALL_PEOPLE_SUCCESS,
        },
        {
          type: LOADING_SUCCESS,
          loading: 'success',
        },
      ];
      const http = axiosMock('/people', mockResponse);
      const store = reduxMockStore(http, peopleInitialState);

      return dispatchMethodMock(
        store,
        getAllPeople(),
        expectedActions,
      );
    });

    it('should return an error message when it fails to fetch and return people', () => {
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Error on fetching people',
          },
        },
      };
      const expectedActions = [
        {
          type: LOADING_REQUEST,
          loading: 'requesting',
        },
        {
          errors: {
            response: {
              data: {
                message: mockErrorResponse.response.data.message,
              },
            },
          },
          type: GET_ALL_PEOPLE_FAILURE,
        },
        {
          type: LOADING_ERROR,
          loading: 'error',
        },
        {
          snack: {
            message: 'Failed to fetch your all users. Kindly reload the page.',
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/people', mockErrorResponse, false);
      const store = reduxMockStore(http, peopleInitialState);

      return dispatchMethodMock(
        store,
        getAllPeople(),
        expectedActions,
      );
    });
  });

  describe('edit person thunk', () => {
    const personId = '5ef359a217b19792a3f19ddc';
    const personUpdatePayload = {
      role: '5ef359a217b19792a3f19ddc',
    };

    it('should edit and return person', () => {
      const mockResponse = {
        data: {
          data: peopleResponse.data[0],
          message: peopleResponse.message,
        },
      };
      const expectedActions = [
        {
          type: LOADING_REQUEST,
          loading: 'requesting',
        },
        {
          person: mockResponse.data.data,
          type: UPDATE_PERSON_DETAILS_SUCCESS,
        },
        {
          type: LOADING_SUCCESS,
          loading: 'success',
        },
        {
          snack: {
            message: mockResponse.data.message,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock(`people/${personId}`, mockResponse);
      const store = reduxMockStore(http, peopleInitialState);

      return dispatchMethodMock(
        store,
        updatePerson(personId, personUpdatePayload),
        expectedActions,
      );
    });

    it('should return an error message when it fails to update a person', () => {
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Error on updating a person',
          },
        },
      };
      const expectedActions = [
        {
          type: LOADING_REQUEST,
          loading: 'requesting',
        },
        {
          errors: {
            response: {
              data: {
                message: mockErrorResponse.response.data.message,
              },
            },
          },
          type: UPDATE_PERSON_DETAILS_FAILURE,
        },
        {
          type: LOADING_ERROR,
          loading: 'error',
        },
        {
          snack: {
            message: mockErrorResponse.response.data.message,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock(`people/${personId}`, mockErrorResponse, false);
      const store = reduxMockStore(http, peopleInitialState);

      return dispatchMethodMock(
        store,
        updatePerson(personId, personUpdatePayload),
        expectedActions,
      );
    });
  });
});
