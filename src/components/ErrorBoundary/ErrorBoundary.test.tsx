// react libraries
import React from 'react';

// third party libraries
import { render, screen, fireEvent } from '@testing-library/react';

// components
import ErrorBoundary from './index';
import reportError from './reportError';

describe.skip('Error Boundary page', () => {
  const props = {};
  jest.mock('../reportError', () => ({
      reportError: jest.fn(() => Promise.resolve({ success: true })),
    }));

  const ErrorContainer = () => null;

  // console.error = jest.fn();
  //
  // beforeEach(() => {
  //   // when the error's thrown a bunch of console.errors are called even though
  //   // the error boundary handles the error. This makes the test output noisy,
  //   // so we'll mock out console.error
  //   jest.spyOn(console, 'error')
  //   console.error.mockImplementation(() => {})
  // });
  //
  // afterEach(() => {
  //   console.error.mockRestore()
  // });

  it('should display an ErrorMessage if wrapped component throws', () => {
    render(
      <ErrorBoundary {...props}>
        <ErrorContainer />
      </ErrorBoundary>,
    );
    // const error = new Error('testError');

    // Act
    fireEvent.click(screen.getByText('💣'))

    // Assert
    expect(reportError).toHaveBeenCalledTimes(1)
    const error = expect.any(TypeError)
    const info = {componentStack: expect.stringContaining('BombButton')}
    expect(reportError).toHaveBeenCalledWith(error, info)

    // expect(screen.getByText(/there was a problem/i)).toBeInTheDocument()
    // expect(console.error).toHaveBeenCalledTimes(2)
  });
});
