// react libraries
import * as React from 'react';

// components
import {
  mapDispatchToProps,
  mapStateToProps
} from './index';

describe('The App component', () => {
  describe('mapStateToProps', () => {
    const state = {
      internalServerError: '',
      user: {},
      loading: ''
    };

    const props = mapStateToProps(state);

    it('should map app props from state', () => {
      expect(props.serverError).toEqual(state.internalServerError);
      expect(props.user).toEqual(state.user);
      expect(props.loading).toEqual(state.loading);
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

    it('ensures getUserDetails is mapped to props', () => {
      props.getUserDetails();
      expect(dispatch).toHaveBeenCalled();
    })
  });
});
