// react libraries
import * as TagManager from 'react-gtm-module';

/**
 * this function Initializes tracking Id for google analytics to push data
 *
 * @returns void
 */
export const initializeGTM = () =>
TagManager.initialize({
  gtmId: process.env.GOOGLE_TAG_MANAGER,
  optimize_id: process.env.GOOGLE_OPTIMIZE_MANAGER,
});
