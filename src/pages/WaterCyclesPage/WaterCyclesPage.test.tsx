// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { WaterCyclesPage } from './index';
import {act} from "react-dom/test-utils";
import { render } from "react-dom";

describe.skip('The Water Cycles Page', () => {
  let wrapper;
  let props;
  let waterCyclesPageInstance;
  let container = null;

  beforeEach(() => {
    // @ts-ignore
    container = document.createElement("div");
    // @ts-ignore
    document.body.appendChild(container);
    props = {
      getAllSchedules: jest.fn(() => Promise.resolve()),
      deleteSingleSchedule: jest.fn(() => Promise.resolve()),
      displaySnackMessage: jest.fn(() => Promise.resolve()),
      togglePump: jest.fn(() => Promise.resolve()),
      getPumpStatus: jest.fn(() => Promise.resolve()),
      toggleScheduleStatus: jest.fn(() => Promise.resolve()),
      schedules: [],
      match: {
        url: '/dashboard',
      },
      isLoading: false,
      location: Location,
      enabled: true,
    };
    wrapper = mount(
      <BrowserRouter>
        <WaterCyclesPage {...props}/>
      </BrowserRouter>
    );
    waterCyclesPageInstance = wrapper.find(WaterCyclesPage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
