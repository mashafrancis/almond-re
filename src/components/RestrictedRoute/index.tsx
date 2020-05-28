// react library
import * as React from 'react';

// third party libraries
import { Redirect, Route } from 'react-router';

// interfaces
import { RestrictedRouteProps } from '@components/RestrictedRoute/interface';

// helpers
import authorize from '@utils/helpers/authorize';

// @ts-ignore
const RestrictedRoute: React.FunctionComponent<RestrictedRouteProps> = (props) => {
  if (!props.authorize || authorize(props.authorize, { strict: props.strict })) {
    return (
      <Route { ...props } />
    );
  }

  if (props.fallbackView) { return props.fallbackView; }

  return (
    <Redirect to={props.redirectTo} />
  );
};

RestrictedRoute.defaultProps = {
  redirectTo: '/',
  strict: false,
};

export default RestrictedRoute;
