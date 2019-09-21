import * as Cookie from 'cookies-js';
import * as jwtDecode from 'jwt-decode';

export const authService = {
  saveToken(token) {
    return Cookie.set('jwt-token', token);
  },
  getToken() {
    return Cookie.get('jwt-token');
  },
  decodeToken() {
    return jwtDecode(this.getToken());
  },
  isAuthenticated() {
    return !!this.getToken();
  },
  isExpired() {
    const currentDate = Date.now() / 1000;
    const decodedToken = this.decodeToken();

    return decodedToken.exp < currentDate;
  },
  getUser() {
    return this.getToken() ? this.decodeToken() : {};
  },
  logoutUser() {
    Cookie.expire('jwt-token', { path: '/' });
  },
  redirectUser() {
    const referrer = window.location.pathname;

    this.logoutUser();
    localStorage.setItem('sessionError', 'Your session has expired, please log in to continue.');
    localStorage.setItem('locationReferrer', referrer);
    window.location.replace('/');
  },
};
