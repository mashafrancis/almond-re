// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';
import { createBrowserHistory } from 'history';

// components
import InternalServerErrorMessage from './index';

describe.skip('Internal Server Error Message', () => {
  let history;
  if (window.location.pathname !== '/') {
    window.history.replaceState(null, null, '/');
  }
  history = createBrowserHistory();
  const props = {
    history,
    errorButton: jest.fn(),
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
  });
});
