// react library
import React, { FunctionComponent } from 'react';

// third party libraries
import { Redirect, Route } from 'react-router-dom';

// interfaces
import { RestrictedRouteProps } from '@components/RestrictedRoute/interface';

// helpers
import authorized from '@utils/authorize';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const RestrictedRoute: FunctionComponent<RestrictedRouteProps> = (props) => {
	const { fallbackView, redirectTo, strict, authorize } = { ...props };
	if (!authorize || authorized(authorize, { strict })) {
		return <Route {...props} />;
	}

	if (fallbackView) {
		return fallbackView;
	}

	return <Redirect to={redirectTo} />;
};

RestrictedRoute.defaultProps = {
	redirectTo: '/',
	strict: false,
};

export default RestrictedRoute;
