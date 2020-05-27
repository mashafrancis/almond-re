// react libraries
import * as React from 'react';

// third party
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { AuthHeader } from './index';

describe('The Auth Header Component', () => {
  let wrapper;
  let props;

  props = {
    forwardButtonName: '',
    backwardButtonName: '',
    forwardLink: '',
    backwardLink: '',
  };

  beforeAll(() => {
    wrapper = mount(
      <BrowserRouter>
        <AuthHeader {...props}/>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
