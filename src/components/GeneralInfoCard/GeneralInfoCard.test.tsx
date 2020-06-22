// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import GeneralCardInfo from "./index";

// component

describe('GeneralCardInfo component', () => {
  const props = {
    mainHeader: 'mainHeader',
    subHeader: 'subHeader',
  };

  const wrapper = shallow(<GeneralCardInfo {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.general-info-card')).toHaveLength(1);
  });
});
