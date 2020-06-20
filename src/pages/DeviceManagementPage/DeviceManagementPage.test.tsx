// react libraries
import * as React from 'react';

// third party
import { mount, shallow } from 'enzyme';

// components
import {
  DeviceManagementPage,
  mapDispatchToProps,
  mapStateToProps
} from './index';
import { props } from "./fixtures";

describe('The DeviceManagement Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DeviceManagementPage {...props}/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.user-roles-page__table')).toHaveLength(1);
  });

  describe('mapStateToProps', () => {
    const state = {
      device: {
        devices: [],
        activeDevice: ''
      }
    };

    const props = mapStateToProps(state);

    it('should map  prop from state', () => {
      expect(props.devices).toEqual(state.device.devices);
      expect(props.activeDevice).toEqual(state.device.activeDevice);
    });
  });

  describe('mapDispatchToProps', () => {
    let dispatch;
    let props;

    beforeEach(() => {
      dispatch = jest.fn();
      props = mapDispatchToProps(dispatch) as any;
    });

    afterEach(() => {
      dispatch = props = null;
    })

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures getAllDevices is mapped to props', () => {
      props.getAllDevices();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures addNewDevice is mapped to props', () => {
      props.addNewDevice();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures editDevice is mapped to props', () => {
      props.editDevice();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures deleteDevice is mapped to props', () => {
      props.deleteDevice();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
