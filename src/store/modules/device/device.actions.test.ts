// thunks
import {
  addNewDevice,
} from '@modules/device/index';

// helper functions
import {
  axiosMock,
  dispatchMethodMock,
  reduxMockStore,
} from '../../../testHelpers';

// types
import {
  ADD_DEVICE_FAILURE,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
} from '@modules/device/types';
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';

// fixtures
import {
  newDevice,
  requestPayload,
} from '@modules/device/fixtures';

const deviceInitialState = {
  data: [],
};

describe.skip('Device actions', () => {
  it('should create and verify a new device', () => {
    const mockResponse = {
      data: newDevice.data,
    };

    const expectedAction = [
      {
        type: ADD_DEVICE_REQUEST,
      },
      {
        data: newDevice.data.data,
        type: ADD_DEVICE_SUCCESS,
        isLoading: false,
      },
      {
        snack: {
          message: 'Device has been added and configured successfully',
        },
        type: DISPLAY_SNACK_MESSAGE,
      },
    ];
    const http = axiosMock('/my-device', mockResponse);
    const store = reduxMockStore(http, deviceInitialState);
    return dispatchMethodMock(
      store,
      addNewDevice(requestPayload),
      expectedAction
    );
  });
});
