// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { EnvironmentControlPage } from './index';

describe.skip('The EnvironmentalControl Page', () => {
  let wrapper;
  let props;
  let waterCyclesPageInstance;

  beforeEach(() => {
    props = {
    };
    wrapper = mount(
      <BrowserRouter>
        <EnvironmentControlPage {...props}/>
      </BrowserRouter>
    );
    waterCyclesPageInstance = wrapper.find(EnvironmentControlPage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
