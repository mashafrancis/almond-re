// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';

// components
import InternalServerErrorMessage from '../InternalServerErrorMessage';

describe('Internal Server Error Message', () => {
  const props = {
    history: {
      goBack: jest.fn(),
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<InternalServerErrorMessage {...props} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('should render the Internal Server Error component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
