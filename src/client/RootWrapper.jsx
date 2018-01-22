import React from 'react';
import Router from './router';

// We need a Root component for React Hot Loading.
function RootWrapper() {
  return <Router />;
}

export default RootWrapper;
