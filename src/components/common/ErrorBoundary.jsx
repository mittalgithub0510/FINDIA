import React from 'react';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
import { ShieldAlert } from '../icons';

/**
 * Standard React Error Boundary preventing application crashes.
 * Renders an on-brand recovery screen with navigation back to safety.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[FINDIA ErrorBoundary caught an exception]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-base text-text-high flex items-center justify-center p-6 select-none">
          <EmptyState
            icon={<ShieldAlert size={32} className="text-sos" />}
            title="Rendering Interrupted"
            description="A component encountered an unexpected state. Telemetry has been logged."
            action={
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => this.setState({ hasError: false })}>
                  Try Again
                </Button>
                <Button variant="primary" size="sm" onClick={this.handleReset}>
                  Return Home
                </Button>
              </div>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
