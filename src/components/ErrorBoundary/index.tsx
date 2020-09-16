import React, { Component } from 'react';

// components
import InternalServerErrorMessage from '@components/InternalServerErrorMessage';
import { ArrowBackRounded } from '@material-ui/icons';

// interfaces
import { ErrorBoundaryState } from '@components/ErrorBoundary/interfaces';
import reportError from '@components/ErrorBoundary/reportError';

export class ErrorBoundary extends Component<ErrorBoundaryState> {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    reportError(error, info);
  }

  render() {
    // render fallback UI
    return this.state.hasError ?
      <InternalServerErrorMessage
        errorButton={
          <button
            onClick={() => window.location.replace('/')}
            className="mdc-button mdc-button--raised">
            <ArrowBackRounded />
            <span className="mdc-button__label">Back</span>
          </button>
        }
        />
      : this.props.children;
  }
}

export default ErrorBoundary;
