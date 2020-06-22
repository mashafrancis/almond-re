// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';
import { createBrowserHistory } from 'history';

// components
import InternalServerErrorMessage from './index';

describe('Internal Server Error page', () => {
  const props = {
    errorButton: <div />
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<InternalServerErrorMessage {...props} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('should render the Internal Server Error components', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#internal-server-error')).toHaveLength(1);
  });
});
