// react libraries
import { lazy } from 'react';
// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';
// pages and components
import HomePage from '@pages/HomePage';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import DashboardContainer from '@pages/DashboardContainer';
import DashboardPage from '@pages/DashboardPage';
import NotFoundPage from '@pages/NotFoundPage';
import UnauthorizedUserModal from '@components/UnauthorizedUserModal';
import SignupPage from '@pages/SignupPage';
import SigninPage from '@pages/SigninPage';
import PasswordResetPage from '@pages/PasswordResetPage';
import RegisterSuccessPage from '@pages/RegisterSuccessPage';
import WithLayout from '../WithLayout';
import {
	Main as MainLayout,
	Minimal as MinimalLayout,
	Dashboard as DashboardLayout,
	DocsLayout,
} from '../layouts';

// pages and components
// const AuthenticatedRoute = lazy(() => import('@components/AuthenticatedRoute'));
// const PageNotFound = lazy(() => import('@components/PageNotFound'));
// const Unauthorized = lazy(() => import('@components/UnauthorizedUserModal'));
// const DashboardContainer = lazy(() => import('@pages/DashboardContainer'));
// const EnterDeviceIdPage = lazy(() => import('@pages/EnterDeviceIdPage'));
// const HomePage = lazy(() => import('@pages/HomePage'));

const Routes = (): any => (
	<Switch>
		<Route
			exact
			path="/"
			render={(matchProps) => (
				<WithLayout {...matchProps} component={HomePage} layout={MainLayout} />
			)}
		/>
		<Route
			exact
			path="/my-device"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={EnterDeviceIdPage}
					layout={MinimalLayout}
				/>
			)}
		/>
		<AuthenticatedRoute
			exact
			path="/dashboard"
			authorize="analytics:view"
			component={(matchProps) => (
        <WithLayout
          {...matchProps}
          component={DashboardPage}
          layout={DashboardLayout}
        />
      )}
			fallbackView={<UnauthorizedUserModal isModalOpen />}
		/>
		<Route
			exact
			path="/register"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={SignupPage}
					layout={MinimalLayout}
				/>
			)}
		/>
		<Route
			exact
			path="/login"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={SigninPage}
					layout={MinimalLayout}
				/>
			)}
		/>
		<Route
			exact
			path="/password-reset"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={PasswordResetPage}
					layout={MinimalLayout}
				/>
			)}
		/>
		<Route
			exact
			path="/register-success"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={RegisterSuccessPage}
					layout={MinimalLayout}
				/>
			)}
		/>
		<Route
			exact
			path="/404"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={NotFoundPage}
					layout={MinimalLayout}
				/>
			)}
		/>
		<Redirect to="/404" />
	</Switch>
);

export default Routes;
