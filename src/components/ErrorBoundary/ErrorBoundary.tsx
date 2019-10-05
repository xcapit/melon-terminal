import React from 'react';
import { default as BaseErrorBoundary, FallbackProps } from 'react-error-boundary';

const Fallback: React.FC<FallbackProps> = ({ error, componentStack }) => (
  <div>
    <p>
      <strong>Oops! An error occured!</strong>
    </p>
    <p>Here’s what we know…</p>
    {error && (
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
    )}
    {componentStack && (
      <p>
        <strong>Stacktrace:</strong> {componentStack}
      </p>
    )}
  </div>
);

export const ErrorBoundary: React.FC = ({ children }) => (
  <BaseErrorBoundary FallbackComponent={Fallback}>{children}</BaseErrorBoundary>
);
