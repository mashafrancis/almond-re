import {string} from 'prop-types';

class CacheHandler {

  // Variable to store the timestamps for recent updates to different endpoints
  static cacheInvalidationRegister = {};

  /**
   * Extracts the API endpoint from an address.
   * That is, the part between the BaseUrl and the Query Parameters
   *
   * @param {string} url
   *
   * @param apiBaseUrl
   * @returns {string}
   */
  static extractUrlEndpoint = (url: string | undefined, apiBaseUrl: string | undefined | any = process.env.ALMOND_API): string => {
    // @ts-ignore
    let baselessUrl = url.replace(apiBaseUrl, '');

    if (baselessUrl === '' || baselessUrl.indexOf('?') === 1) {
      return '/';
    }

    baselessUrl = baselessUrl.indexOf('/') === 0 ? baselessUrl : `/${baselessUrl}`;
    const endpoints = baselessUrl.match(/\/[\w\-]+/);

    // @ts-ignore
    return endpoints && endpoints[0] || null;
  }
}

export default CacheHandler;
