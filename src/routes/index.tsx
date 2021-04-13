// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';
// pages and components
import HomePage from '@pages/HomePage';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import DashboardContainer from '@pages/DashboardContainer';
import NotFoundPage from '@pages/NotFoundPage';
import UnauthorizedUserModal from '@components/UnauthorizedUserModal';
import SignupPage from '@pages/SignupPage';
import SigninPage from '@pages/SigninPage';
import {
	PasswordResetPage,
	CreateNewPasswordPage,
} from '@pages/PasswordResetPage';
import RegisterSuccessPage from '@pages/RegisterSuccessPage';
import WithLayout from '../WithLayout';
import {
	Main as MainLayout,
	Minimal as MinimalLayout,
	Dashboard as DashboardLayout,
} from '../layouts';

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
		<Route
			exact
			path="/dashboard"
			// authorize="analytics:view"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={DashboardContainer}
					layout={DashboardLayout}
				/>
			)}
			// fallbackView={<UnauthorizedUserModal isModalOpen />}
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
			path="/password-change"
			render={(matchProps) => (
				<WithLayout
					{...matchProps}
					component={CreateNewPasswordPage}
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
