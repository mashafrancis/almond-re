// react libraries
import * as ReactGA from 'react-ga';

/**
 * This function Initializes tracking Id for google analytics to push data
 * @returns void
 */
export const initializeGA = (): void =>
	ReactGA.initialize(process.env.GOOGLE_TRACKING_ID as string, {
		testMode: process.env.NODE_ENV === 'test',
	});

/**
 * This function logs the page that is being viewed
 *
 * @param {String} pathname
 * @returns void
 */
export const logPageView = (pathname: string) => ReactGA.pageview(pathname);
