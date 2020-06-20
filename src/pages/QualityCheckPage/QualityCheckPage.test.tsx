// react libraries
import * as React from 'react';

// third party
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import {
  mapDispatchToProps,
  mapStateToProps,
  QualityCheckPage
} from './index';

describe('The QualityCheck Page', () => {
  let wrapper;
  let props;
  let waterCyclesPageInstance;

  beforeEach(() => {
    props = {
    };
    wrapper = shallow(<QualityCheckPage {...props}/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find('.main-subheader')).toHaveLength(1);
  });

  describe('mapStateToProps', () => {
    const state = {
      error: {
        error: '',
      },
    };

    const props = mapStateToProps(state);

    it('should map user prop from state', () => {
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
    })

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    })
  });
});
