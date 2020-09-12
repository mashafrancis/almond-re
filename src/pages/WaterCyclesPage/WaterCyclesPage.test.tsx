// react libraries
import React from 'react';
import { Location } from 'history';

// third party
import {mount, shallow} from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import {
  mapDispatchToProps,
  mapStateToProps,
  WaterCyclesPage
} from './index';
import {act} from "react-dom/test-utils";
import { render } from "react-dom";

describe('The Water Cycles Page', () => {
  let wrapper;
  let props;

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

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <WaterCyclesPage {...props}/>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const state = {
      timeSchedules: {
        schedules: [],
        status: '',
        isLoading: true,
        enabled: true,
      },
      user: {
        devices: [],
      },
      sensorData: {
        waterData: [],
      },
    };

    const props = mapStateToProps(state);

    it('should map water cycles page props from state', () => {
      expect(props.schedules).toEqual(state.timeSchedules.schedules);
      expect(props.devices).toEqual(state.user.devices);
      expect(props.enabled).toEqual(state.timeSchedules.enabled);
      expect(props.status).toEqual(state.timeSchedules.status);
      expect(props.isLoading).toEqual(state.timeSchedules.isLoading);
      expect(props.user).toEqual(state.user);
      expect(props.waterData).toEqual(state.sensorData.waterData);
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

    it('ensures addNewSchedule is mapped to props', () => {
      props.addNewSchedule();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures editSchedule is mapped to props', () => {
      props.editSchedule();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures deleteSingleSchedule is mapped to props', () => {
      props.deleteSingleSchedule();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures getAllSchedules is mapped to props', () => {
      props.getAllSchedules();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures getPumpStatus is mapped to props', () => {
      props.getPumpStatus();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures togglePump is mapped to props', () => {
      props.togglePump();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures toggleScheduleStatus is mapped to props', () => {
      props.toggleScheduleStatus();
      expect(dispatch).toHaveBeenCalled();
    });

    // it('ensures getWaterData is mapped to props', () => {
    //   props.getWaterData();
    //   expect(dispatch).toHaveBeenCalled();
    // });
  });
});
