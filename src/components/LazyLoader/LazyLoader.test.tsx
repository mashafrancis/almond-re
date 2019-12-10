// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';

// components
import LazyLoader from './index';

describe('Lazy Loader', () => {
  let wrapper;

  beforeEach(() => {
    const props = <div/>;

    wrapper = mount(<LazyLoader {...props} />);
  });

  it('should render the lazy loader components', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
