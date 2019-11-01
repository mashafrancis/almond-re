import * as React from 'react';

// third party apps
import * as Sentry from '@sentry/browser';

// components
import InternalServerErrorMessage from '@components/InternalServerErrorMessage';

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

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return (
        <InternalServerErrorMessage
          errorButton={<button className="mdc-button mdc-button--outlined" onClick={
            () => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report error</button>}
        />
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
