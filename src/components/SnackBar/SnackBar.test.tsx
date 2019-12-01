// react libraries
import * as React from 'react';

// components
import SnackBar, { mapStateToProps } from './index';

// thunks
import { displaySnackMessage } from '../../store/modules/snack';

// helpers
import { mountWithRedux } from '../../testHelpers';

describe('The SnackBar components', () => {
  const SAMPLE_SNACK_MESSAGE = 'Time schedule created successfully.';
  const props = {
    snack: {
      message: SAMPLE_SNACK_MESSAGE,
      withName: false,
    },
  };

  const { wrapper, store } = mountWithRedux(<SnackBar { ...props } />);

  it.skip('displays a snack message if it receives new snack props', () => {

    store.dispatch(displaySnackMessage(SAMPLE_SNACK_MESSAGE));

    const { snack } = store.getState();

    expect(snack.message).toBe(SAMPLE_SNACK_MESSAGE);

    expect(wrapper.html()).toMatch(SAMPLE_SNACK_MESSAGE);
  });

  it.skip('hides the snack message after six seconds', () => {
    jest.useFakeTimers();

    store.dispatch(displaySnackMessage(`${SAMPLE_SNACK_MESSAGE} 6`));

    expect(wrapper.html()).toMatch(`${SAMPLE_SNACK_MESSAGE} 6`);

    jest.runAllTimers();
    expect(wrapper.html()).toMatch('<div></div>');
  });

  describe('mapStateToProps', () => {
    it('returns the expected props object', () => {
      const state = {
        snack: {
          message: '',
          withName: false,
        },
      };
      const props = mapStateToProps(state);

      expect(props.snack).toEqual(state.snack);
    });
  });
});
