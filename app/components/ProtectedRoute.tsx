import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface Auth {
  // Define your Auth properties here
}

interface ProtectedRouteProps {
  auth: Auth | undefined;
  component: React.ComponentType<any>;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, component: Component, path }) => {
  if (auth === undefined) {
    // Handle the undefined case, maybe redirect to a login page or show a loading spinner
    return <Navigate to="/login" />;
  }

  return (
    <Route
      path={path}
      element={auth ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;