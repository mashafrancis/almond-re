// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';

// components
import LazyLoader from 'components/LazyLoader';

describe('Lazy Loader', () => {
  let wrapper;

  beforeEach(() => {
    const props = <div></div>;

    wrapper = mount(<LazyLoader {...props} />);
  });

  it('should render the lazy loader component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
