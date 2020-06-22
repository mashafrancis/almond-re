// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';

// components
import ErrorBoundary from "./index";

describe('Error Boundary page', () => {
  let wrapper;
  const props = {
  };

  const ErrorContainer = () => null;

  beforeEach(() => {
    wrapper = mount(
      <ErrorBoundary {...props}>
        <ErrorContainer />
      </ErrorBoundary>
      );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should display an ErrorMessage if wrapped component throws', () => {
    const error = new Error('testError');
    expect(wrapper).toMatchSnapshot();
    wrapper.find(ErrorContainer).simulateError(error);
  });
});
