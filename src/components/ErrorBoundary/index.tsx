import * as React from 'react';

// components
import InternalServerErrorMessage from '@components/InternalServerErrorMessage';
import { ArrowBackRounded } from "@material-ui/icons";

// interfaces
import { ErrorBoundaryState } from '@components/ErrorBoundary/interfaces';

export class ErrorBoundary extends React.Component<ErrorBoundaryState> {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  state = {
    eventId: null,
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return (
        <InternalServerErrorMessage
          errorButton={
            <button onClick={() => window.location.replace('/')} className="mdc-button mdc-button--raised">
              <ArrowBackRounded />
              <span className="mdc-button__label">Back</span>
            </button>
          }
        />
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
