// react libraries
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { AnalyticsPage } from './index';

describe.skip('The Analytics Page', () => {
  let wrapper;
  let props;
  let analyticsPageInstance;

  beforeEach(() => {
    props = {
      match: {
        url: '/analytics',
      },
    };
    wrapper = mount(
      <BrowserRouter>
        <AnalyticsPage {...props}/>
      </BrowserRouter>
    );
    analyticsPageInstance = wrapper.find(AnalyticsPage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
