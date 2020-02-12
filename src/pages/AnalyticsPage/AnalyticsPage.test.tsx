// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { AnalyticsPage } from './index';

describe.skip('The Analytics Page', () => {
  let wrapper;
  let props;
  let waterCyclesPageInstance;

  beforeEach(() => {
    props = {
      match: {
        url: '/analytics',
      },
      isLoading: false,
      location: Location,
      enabled: true,
    };
    wrapper = mount(
      <BrowserRouter>
        <AnalyticsPage {...props}/>
      </BrowserRouter>
    );
    waterCyclesPageInstance = wrapper.find(AnalyticsPage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
