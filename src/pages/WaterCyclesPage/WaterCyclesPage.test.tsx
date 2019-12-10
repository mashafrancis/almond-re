// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// helpers
import { routerContext } from '../../testHelpers';

import WaterCyclesPage from './index';

describe.skip('Water Cycle Page', () => {
  let wrapper;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      isLoading: false,
      displaySnackMessage: jest.fn(),
    };
    wrapper = shallow(<WaterCyclesPage {...props} />, routerContext).dive();
    instance = wrapper.instance();
    wrapper.setState({
      isLoading: false,
    });
  });

  // afterEach(() => {
  //   wrapper.unmount();
  // });

  it('should be rendered properly', () => {
    // expect(wrapper.find('.head-title').exists).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
