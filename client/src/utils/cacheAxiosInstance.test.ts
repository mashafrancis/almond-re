// helpers
import cacheAxiosInstance from '../utils/cacheAxiosInstance';
import CacheHandler from './helpers/CacheHandler';

describe('The cacheAxiosInstance util', () => {
  let dummyAxios;
  let cachedInstance;
  let cacheHandler;

  beforeEach(() => {
    dummyAxios = {
      num: 0,
      get: () => Promise.resolve(dummyAxios.num += 1),
      post: () => Promise.resolve(dummyAxios.num += 2),
    };

    cacheHandler = Object.create(CacheHandler);
    cachedInstance = cacheAxiosInstance(dummyAxios, 1000, cacheHandler);
  });

  it('should cache get requests if config object is passed and cache is set to true', () => {
    return Promise
      .all([
        cachedInstance.get('/test', { cache: true }),
        cachedInstance.get('/test', { cache: true }),
      ])
      .then(([response1, response2]) => {
        expect(response1).toEqual(1);
        expect(response2).toEqual(1);
      });
  });

  it('should not cache get requests if config object is not passed', () => {
    return Promise
      .all([
        cachedInstance.get('/test'),
        cachedInstance.get('/test'),
      ])
      .then(([response1, response2]) => {
        expect(response1).toEqual(1);
        expect(response2).toEqual(2);
      });
  });

  it('should not cache get request if ttl expires', () => {
    return Promise
      .all([
        cachedInstance.get('/test', { cache: true }),
        cachedInstance.get('/test', { cache: true,  ttl: 0 }),
      ])
      .then(([response1, response2]) => {
        expect(response1).toEqual(1);
        expect(response2).toEqual(2);
      });
  });

  it('should not cache other requests that are not "get"', () => {
    return Promise
      .all([
        cachedInstance.post('/test', { cache: true }),
        cachedInstance.post('/test', { cache: true }),
      ])
      .then(([response1, response2]) => {
        expect(response1).toEqual(2);
        expect(response2).toEqual(4);
      });
  });
});
