// third-party libraries
import * as Cookies from 'cookies-js';

// helpers
import store from '../../store';
import { axiosMockAdapter, expiredToken, token } from '../../testHelpers';
import { authService } from '../../utils/auth';
import http from '../../utils/helpers/http';
import CacheHandler from './CacheHandler';

describe.skip('The http axios instance helper function', () => {
  authService.logoutUser = jest.fn();
  authService.redirectUser = jest.fn();
  window.location.replace = jest.fn();

  const response = {
    status: 200,
    data: {},
    headers: {},
  };

  const error = {
    response: {
      status: 500,
      data: {
        message: 'token has expired',
      },
      headers: {},
    },
  };
  const serverErrorMock = {
    response: {
      status: 500,
      data: {
        message: 'Internal Server Error',
      },
      headers: {},
    },
  };

  it('should NOT log user out or redirect user to root (/) when the token is NOT expired', (done) => {
    Cookies.set('jwt-token', token);
    axiosMockAdapter(response, null);

    http('/people').then(() => {
      expect(authService.logoutUser).not.toHaveBeenCalled();
      expect(window.location.replace).not.toHaveBeenCalled();
      done();
    });
  });

  it('should log user out and redirect user to root (/) when the token is expired', (done) => {
    Cookies.set('jwt-token', expiredToken);
    axiosMockAdapter(response, null);

    http('/people').then(() => {
      expect(authService.redirectUser).toHaveBeenCalled();
      done();
    });
  });

  it('should log user out and redirect user to root (/) when a server error (500) is returned', (done) => {
    Cookies.set('jwt-token', token);
    axiosMockAdapter(null, error);

    http('/people').catch(() => {
      expect(authService.redirectUser).toHaveBeenCalled();
      done();
    });
  });

  it('should render 500 error component', (done) => {
    Cookies.set('jwt-token', token);
    axiosMockAdapter(null, serverErrorMock);

    http('/people').catch(() => {
      expect(store.dispatch).toHaveBeenCalled();
      done();
    });
  });

  describe('Conditional Caching', () => {
    beforeEach(() => {
      Cookies.set('jwt-token', token);
      axiosMockAdapter(null, error);
    });

    it('should update the request timestamp for an endpoint when a non-get request is made', () => {
      const interceptor = <any> http.interceptors.response;

      interceptor.handlers[0].fulfilled({
        config: {
          method: 'post',
          url: '/test-endpoint',
        },
      });

      expect(CacheHandler.cacheInvalidationRegister).toHaveProperty('/test-endpoint');
    });

    it('should update the request timestamp for asset endpoint when a non-get request is made', () => {
      const interceptor = <any> http.interceptors.response;

      interceptor.handlers[0].fulfilled({
        config: {
          method: 'post',
          url: '/users',
        },
      });

      expect(CacheHandler.cacheInvalidationRegister).toHaveProperty('/users-categories');
    });
  });
});
