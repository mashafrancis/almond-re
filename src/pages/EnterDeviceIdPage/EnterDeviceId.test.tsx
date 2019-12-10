// react libraries
import * as React from 'react';

// third party
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import {
  EnterDeviceIdPage,
  mapDispatchToProps,
  mapStateToProps
} from './index';

// helpers
import { flushPromises } from '../../testHelpers';

describe('The EnterDeviceId Page', () => {
  let wrapper;
  let shallowWrapper;
  let props;

  props = {
    addNewDevice: jest.fn(() => Promise.resolve()),
    displaySnackMessage: jest.fn(),
    isLoading: false,
  };

  beforeAll(() => {
    wrapper = mount(
      <BrowserRouter>
        <EnterDeviceIdPage {...props} />
      </BrowserRouter>
      );
  });

  beforeEach(() => {
    props = {
      addNewDevice: jest.fn(() => Promise.resolve()),
      displaySnackMessage: jest.fn(),
      isLoading: false,
    };
  });

  shallowWrapper = shallow(<EnterDeviceIdPage {...props} />);

  afterEach(() => {
    wrapper = shallowWrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
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

    it('should dispatch addNewDevice when it is called', () => {
      props.addNewDevice();

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
