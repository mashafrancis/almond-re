// react libraries
import React from 'react';

// components
import {
  EnterDeviceIdPage,
  mapDispatchToProps,
  mapStateToProps
} from './index';
import { renderWithRouter } from '../../testHelpers';
import { props } from './fixtures';

describe('The EnterDeviceId Page', () => {
  const { asFragment } = renderWithRouter(<EnterDeviceIdPage {...props} />)

  it('should render properly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  describe('mapStateToProps function', () => {
    it('should return the expected props object', () => {
      const state = {
        device: {
          isLoading: false,
        },
      };
      const props = mapStateToProps(state);
      expect(props.isLoading).toEqual(state.device.isLoading);
    });
  });

  describe('mapDispatchToState function', () => {
    let dispatch;
    let props;

    beforeEach(() => {
      dispatch = jest.fn(() => Promise.resolve());
      props = mapDispatchToProps(dispatch);
    });

    it('should dispatch verifyUserDevice when it is called', () => {
      props.verifyUserDevice();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should dispatch getUserDetails when it is called', () => {
      props.getUserDetails();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
