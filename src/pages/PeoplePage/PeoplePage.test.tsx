// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { PeoplePage } from './index';

describe.skip('The People Page', () => {
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
        <PeoplePage {...props}/>
      </BrowserRouter>
    );
    waterCyclesPageInstance = wrapper.find(PeoplePage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
