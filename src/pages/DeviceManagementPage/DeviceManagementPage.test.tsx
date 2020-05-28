// react libraries
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { DeviceManagementPage } from './index';

describe.skip('The DeviceManagement Page', () => {
  let wrapper;
  let props;
  let deviceManagementPageInstance;

  beforeEach(() => {
    props = {
      getAllDevices: jest.fn(() => Promise.resolve()),
      editDevice: jest.fn(() => Promise.resolve()),
      addNewDevice: jest.fn(() => Promise.resolve()),
      deleteDevice: jest.fn(() => Promise.resolve()),
      displaySnackMessage: jest.fn(() => Promise.resolve()),
      devices: [],
      activeDevice: '',
    };
    wrapper = mount(
      <BrowserRouter>
        <DeviceManagementPage {...props}/>
      </BrowserRouter>
    );
    deviceManagementPageInstance = wrapper.find(DeviceManagementPage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
