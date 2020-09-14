// react libraries
import React, { Suspense } from 'react';

import HomePage, { mapDispatchToProps, mapStateToProps } from './index';
import { mountWithRedux, renderWithRouter } from '../../testHelpers';

describe('Home Page', () => {
  const props = {
    displaySnackMessage: jest.fn(() => Promise.resolve()),
  };

  const initialState = {};

  const { asFragment, getByTestId } = mountWithRedux(
    <Suspense fallback={<h1>test loading</h1>}>
      <HomePage {...props} />
    </Suspense>,
    initialState,
  );

  it('should be rendered properly', () => {
    // expect(wrapper.find('button').exists).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();

    const elem = getByTestId('homepage');
    expect(elem.classList[0]).toBe('background-cover');
  });

  // it('should render dashboard button which redirects to "/dashboard', () => {
  //   expect(wrapper.find('a[href="/dashboard"]')).toBeTruthy();
  // });

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
