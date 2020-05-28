// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

import HomePage from './index';

describe.skip('Home Page', () => {
  // const props = {
  //   displaySnackMessage: jest.fn(() => Promise.resolve()),
  // };

  it('should be rendered properly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('button').exists).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render dashboard button which redirects to "/dashboard', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('a[href="/dashboard"]')).toBeTruthy();
  });
});
