// react library
import React from 'react';

// third-party libraries
import { render, screen } from "@testing-library/react";

// components
import Logo from './index';

describe('Logo component', () => {

  it('should render correctly', () => {
    const { asFragment } = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('logo');
    expect(elem.classList[0]).toBe('main-logo');
  });
});
