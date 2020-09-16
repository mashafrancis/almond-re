// react library
import React from 'react';

// third-party libraries
import { render, screen } from '@testing-library/react';

// components
import Loader from './index';

describe('Loader components', () => {

  it('should render correctly', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();

    const elemContainer = screen.getByTestId('container');
    expect(elemContainer.classList[0]).toBe('container');

    const elem = screen.getByTestId('dot-1');
    expect(elem.classList[1]).toBe('dot-1');
  });
});
