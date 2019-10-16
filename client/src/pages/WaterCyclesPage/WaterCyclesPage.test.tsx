// react libraries
import * as React from 'react';

// third-party libraries
import { mount } from 'enzyme';

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
    wrapper = mount(<WaterCyclesPage {...props} />, routerContext);
    instance = wrapper.instance();
    wrapper.setState({
      isLoading: false,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should be rendered properly', () => {
    // expect(wrapper.find('.head-title').exists).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
