// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import CardInfo from "./index";

// component

describe('CardInfo component', () => {
  const props = {
    mainHeader: 'mainHeader',
    subHeader: 'subHeader',
    buttonName: 'buttonName',
  };

  const wrapper = shallow(<CardInfo {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.info-card')).toHaveLength(1);
  });
});
