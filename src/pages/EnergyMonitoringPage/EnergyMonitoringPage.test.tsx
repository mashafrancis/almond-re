// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import { render, screen } from '@testing-library/react';

// components
import {
  EnergyMonitoringPage,
  mapDispatchToProps,
  mapStateToProps,
} from './index';
import { props } from './fixtures';

describe('The EnergyMonitoring Page', () => {
  const { asFragment } = render(<EnergyMonitoringPage {...props} />);

  it('should render properly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  // it('should render properly on mobile view', () => {
  //   const resizeWindow = (x: number, y: number) => {
  //     window.innerWidth = x;
  //     window.innerHeight = y;
  //     window.dispatchEvent(new Event('resize'));
  //   };
  //   resizeWindow(500, 300);
  //   expect(wrapper.find('.main-subheader')).toHaveLength(1);
  // });

  describe('mapStateToProps', () => {
    const state = {
      error: '',
    };

    const props = mapStateToProps(state);

    it('should map energy monitoring props from state', () => {
      expect(props.error).toEqual(state.error);
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

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
