// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

import HomePage, { mapDispatchToProps, mapStateToProps } from './index';
import { BrowserRouter } from 'react-router-dom';

describe('Home Page', () => {
  let wrapper;
  let props;

  props = {
    displaySnackMessage: jest.fn(() => Promise.resolve()),
  };

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <HomePage {...props}/>
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should be rendered properly', () => {
    expect(wrapper.find('button').exists).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render dashboard button which redirects to "/dashboard', () => {
    expect(wrapper.find('a[href="/dashboard"]')).toBeTruthy();
  });

  describe('mapStateToProps', () => {
    const state = {
      isLoading: true,
    };

    const props = mapStateToProps(state);

    it('should map home page props from state', () => {
      expect(props.isLoading).toEqual(state.isLoading);
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
