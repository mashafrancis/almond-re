// react libraries
import * as React from 'react';

// third party
import {mount, shallow} from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import {
  EnvironmentControlPage,
  mapDispatchToProps,
  mapStateToProps
} from './index';

describe('The EnvironmentalControl Page', () => {
  let wrapper;
  let props;

  props = {
    getEnvironmentData: jest.fn(() => Promise.resolve()),
    displaySnackMessage: jest.fn(() => Promise.resolve()),
    environmentData: []
  };

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <EnvironmentControlPage {...props}/>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const state = {
      sensorData: {
        environmentData: [],
      }
    };

    const props = mapStateToProps(state);

    it('should map environment control page props from state', () => {
      expect(props.environmentData).toEqual(state.sensorData.environmentData);
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
    });

    // it('ensures getEnvironmentData is mapped to props', () => {
    //   props.getEnvironmentData();
    //   expect(dispatch).toHaveBeenCalled();
    // });

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
