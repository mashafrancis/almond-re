// react libraries
import React from 'react';

// third-party libraries
import { render } from '@testing-library/react';

// component
import MenuContent from './index';

describe('MenuContent component', () => {
  const props = {
    name: 'name',
    photo: 'photo',
  };

  it('should render correctly', () => {
    const { asFragment } = render(<MenuContent {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
