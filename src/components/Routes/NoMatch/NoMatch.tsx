import React from 'react';
import { RouteComponentProps } from 'react-router';

export const NoMatch: React.FC<RouteComponentProps> = () => (
  <div>
    <p><strong>Oops! We did not find the page you are looking for.</strong></p>
  </div>
);

export default NoMatch;
