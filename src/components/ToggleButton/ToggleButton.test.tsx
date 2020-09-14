// react libraries
import React from 'react';

// third-party libraries
import { render, screen } from "@testing-library/react";

// component
import ToggleButton from "./index";

describe('ToggleButton component', () => {
  const props = {
    classes: 'toggle-button'
  };

  const { asFragment } = render(<ToggleButton {...props} />);

  it('should render correctly', () => {
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('toggle-button');
    expect(elem.classList[0]).toBe('toggle-button');
  });
});
