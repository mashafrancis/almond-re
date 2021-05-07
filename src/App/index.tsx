// react libraries
import { useEffect, Suspense, useRef } from 'react';
// third party libraries
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { GitHubCreateIssue, issueBody, issueHeading } from 'git-bug-trace';
// components
import { ErrorBoundary } from 'react-error-boundary';
import { SnackBar } from '@components/atoms/SnackBar';
import { LinearProgressBar } from '@components/atoms';
import ServerErrorPage from '@pages/ServerErrorPage';
// thunk action creators
import { getUserDetails } from '@modules/user';
// helper functions
import authService from '@utils/auth';
import checkUserRole from '@utils/checkUserRole';
import { initializeGA, logPageView } from '@utils/googleAnalytics';
// context
import { Connector } from '@hooks/mqtt';
import { UserContext } from '@context/UserContext';
import { ViewportProvider } from '@context/ViewportContext';
import { ComponentProvider } from '@context/ComponentContext';
import useEffectAsync from '@hooks/useEffectAsync';
// styles
import 'react-lazy-load-image-component/src/effects/opacity.css';
// import 'swiper/css/swiper.min.css';
// import 'aos/dist/aos.css';
// interfaces
import { IClientOptions } from 'mqtt';
import { LinearProgress, StyledEngineProvider } from '@material-ui/core';
import Routes from '../routes';
import { IRootState } from '../store/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
			backgroundColor: '#dedede',
		},
	}),
);

// const configurations = {
// 	token: `token ${process.env.GITHUB_TOKEN}`,
// 	owner: 'almond-hydroponics',
// 	repository: 'almond-tr',
// 	appName: 'almond-web',
// 	baseUrl: 'https://api.github.com',
// };

export const App = (): JSX.Element => {
	const { snack } = useSelector((globalState: IRootState) => globalState);
	const {
		userDetails: {
			_id,
			firstName,
			lastName,
			email,
			photo,
			devices,
			isVerified,
			activeDevice,
			currentRole,
		},
		isLoading,
	} = useSelector((globalState: IRootState) => globalState.user);

	const timerRef = useRef<number>();
	const classes = useStyles();
	const dispatch = useDispatch();
	const { search } = useLocation();
	const isAuthenticated = authService.isAuthenticated();

	useEffect(() => {
		initializeGA();
		logPageView(window.location.pathname);
		// almondIssue()
		// 	.then(() => console.log('Bug sent'))
		// 	.catch((e) => console.error(e));
	}, []);

	useEffectAsync(async () => {
		if (isAuthenticated) {
			await dispatch(getUserDetails());
		}
	}, [isAuthenticated]);

	useEffect(() => {
		const { socialToken } = queryString.parse(search);

		if (socialToken) {
			authService.saveToken(socialToken);
			window.location.replace(process.env.PUBLIC_URL as string);
		}
	}, []);

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[],
	);

	const userDetailsOnProvider = {
		_id,
		email,
		photo,
		devices,
		isVerified,
		activeDevice,
		name: `${firstName} ${lastName}`,
		isAdmin: !checkUserRole(currentRole?.title ?? 'User', 'User'),
	};

	// const bugIssue = {
	// 	header: issueHeading('GetUsers', configurations.appName),
	// 	body: issueBody('Sample Exception', 'Its own StackTrace'),
	// 	configurations,
	// };

	// const almondIssue = async () => GitHubCreateIssue(bugIssue);

	const bufferKey = Buffer.from(`${process.env.KEY}`).toString('utf-8');
	const bufferCert = Buffer.from(`${process.env.CERT}`).toString('utf-8');
	const bufferCA = Buffer.from(`${process.env.TRUSTED_CA}`).toString('utf-8');

	const options: IClientOptions = {
		username: process.env.MQTT_USER,
		password: process.env.MQTT_PASSWORD,
		// keepalive: 0,
		// clientId: 'almond',
		// protocolId: 'MQTT',
		// protocolVersion: 4,
		// clean: true,
		// reconnectPeriod: 1000,
		// connectTimeout: 30 * 1000,
		// will: {
		// 	topic: 'almond/lastWill',
		// 	payload: 'Connection Closed abnormally..!',
		// 	qos: 2,
		// 	retain: false,
		// },
		// key: bufferKey,
		// cert: bufferCert,
		// ca: bufferCA,
		rejectUnauthorized: false,
	};

	return (
		<ErrorBoundary
			FallbackComponent={ServerErrorPage}
			onReset={() => window.location.replace('/')}
		>
			<Connector
				brokerUrl={`wss://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`}
				options={options}
				parserMethod={(msg) => msg}
			>
				<UserContext.Provider value={userDetailsOnProvider}>
					<ComponentProvider>
						<ViewportProvider>
							<StyledEngineProvider injectFirst>
								<SnackBar snack={snack} />
								{window.location.pathname !== '/' && isAuthenticated}
								<Suspense fallback={<LinearProgressBar />}>
									{isLoading ? <LinearProgress color="primary" /> : <Routes />}
								</Suspense>
							</StyledEngineProvider>
						</ViewportProvider>
					</ComponentProvider>
				</UserContext.Provider>
			</Connector>
		</ErrorBoundary>
	);
};

export default App;
