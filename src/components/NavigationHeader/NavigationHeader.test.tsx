// react libraries
import React from 'react';

// components
import NavigationHeader from './index';
import { renderWithRouter } from '../../testHelpers';


describe('The Auth Header Component', () => {
  const props = {
    forwardButtonName: '',
    backwardButtonName: '',
    forwardLink: '',
    backwardLink: '',
  };

  it('should render properly', () => {
    const { asFragment } = renderWithRouter(<NavigationHeader {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
