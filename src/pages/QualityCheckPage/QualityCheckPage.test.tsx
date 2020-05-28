// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import { QualityCheckPage } from './index';

describe.skip('The QualityCheck Page', () => {
  let wrapper;
  let props;
  let waterCyclesPageInstance;

  beforeEach(() => {
    props = {
    };
    wrapper = mount(
      <BrowserRouter>
        <QualityCheckPage {...props}/>
      </BrowserRouter>
    );
    waterCyclesPageInstance = wrapper.find(QualityCheckPage).instance();
  });

  afterEach(() => {
    wrapper = props = null;
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
