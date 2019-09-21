// react library
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import PageNotFound from '.';

const props = {
  history: { goBack: jest.fn() },
};

describe('PageNotFound component', () => {
  const wrapper = shallow(<PageNotFound { ...props }/>);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Page Not Found component', () => {
    expect(wrapper.find('.notfound').length).toEqual(1);
  });
});
