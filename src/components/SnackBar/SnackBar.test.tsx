// react libraries
import React from 'react';

// components
import { mapStateToProps, SnackBar } from "./index";

// thunks
import { displaySnackMessage } from '../../store/modules/snack';

// helpers
import { mountWithRedux } from '../../testHelpers';

describe('The SnackBar components', () => {
  const SAMPLE_SNACK_MESSAGE = 'Time schedule created successfully.';
  const props = {
    snack: {
      message: SAMPLE_SNACK_MESSAGE
    },
  };

  const { wrapper, store } = mountWithRedux(<SnackBar { ...props } />);

  it('displays a snack message if it receives new snack props', () => {
    store.dispatch(displaySnackMessage(SAMPLE_SNACK_MESSAGE));
    const { snack } = store.getState();

    expect(snack.message).toBe(SAMPLE_SNACK_MESSAGE);
    expect(wrapper.html()).toMatch(SAMPLE_SNACK_MESSAGE);
  });

  it.skip('hides the snack message after eight seconds', () => {
    jest.useFakeTimers();
    store.dispatch(displaySnackMessage(`${SAMPLE_SNACK_MESSAGE} 8`));

    expect(wrapper.html()).toMatch(`${SAMPLE_SNACK_MESSAGE} 8`);
    jest.runAllTimers();
    expect(wrapper.html()).toMatch('<div></div>');
  });

  describe('mapStateToProps', () => {
    it('returns the expected props object', () => {
      const state = {
        snack: {
          message: ''
        },
      };
      const props = mapStateToProps(state);

      expect(props.snack).toEqual(state.snack);
    });
  });
});
