// react libraries
import React from 'react';
import { createStore } from 'redux';

// components
import { mapStateToProps, SnackBar } from './index';

// helpers
import { mountWithRedux } from '../../testHelpers';

describe('The SnackBar components', () => {
  const SAMPLE_SNACK_MESSAGE = 'Time schedule created successfully.';
  const props = {
    snack: {
      message: SAMPLE_SNACK_MESSAGE,
    },
  };

  const initialState = {
    snack: {
      message: SAMPLE_SNACK_MESSAGE
    }
  };

  const store = createStore(() => ({
    snack: {
      message: SAMPLE_SNACK_MESSAGE
    }
  }))

  it('displays a snack message if it receives new snack props', () => {
    const { asFragment } = mountWithRedux(<SnackBar {...props} />, initialState, store);
    const { snack } = store.getState();

    expect(asFragment()).toMatchSnapshot();
    expect(snack.message).toBe(SAMPLE_SNACK_MESSAGE);
  });

  describe('mapStateToProps', () => {
    it('returns the expected props object', () => {
      const state = {
        snack: {
          message: '',
        },
      };
      const props = mapStateToProps(state);

      expect(props.snack).toEqual(state.snack);
    });
  });
});
