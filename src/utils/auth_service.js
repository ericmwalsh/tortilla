import Auth0Lock from 'auth0-lock';

export default class AuthService {
  constructor() {
    const config = {
      AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
      REDIRECT_URL: 'http://localhost:4000/callback',
    }

    // Configure Auth0 lock
    this.lock = new Auth0Lock(
      config.AUTH0_CLIENT_ID,
      config.AUTH0_DOMAIN,
      {
        auth: {
          // redirectUrl: config.REDIRECT_URL,
          responseType: 'token',
        },
        theme: {
          primaryColor: '#b81b1c',
        },
        languageDictionary: {
          title: 'Coinucopio',
        },
      }
    );
    // Binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  // ======================================================
  // Public methods
  // ======================================================
  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  // ======================================================
  // Static methods
  // ======================================================
  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken();
    return !!token && !AuthService.isTokenExpired(token);
  }

  static logout() {
    // Clear user token and profile data from window.localStorage
    window.localStorage.removeItem('auth0_token');
    window.localStorage.removeItem('profile');
  }

  static getProfile() {
    // Retrieves the profile data from window.localStorage
    const profile = window.localStorage.getItem('profile');
    return profile ? JSON.parse(window.localStorage.profile) : {};
  }

  static setProfile(profile) {
    // Saves profile data to window.localStorage
    window.localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
  }

  static setToken(jsonToken) {
    // Saves user token to window.localStorage
    window.localStorage.setItem(
      'auth0_token',
      JSON.stringify(Object.assign(jsonToken, {expiresAt: jsonToken.expiresIn * 1000 + Date.now()}))
    );
  }

  static getToken() {
    // Retrieves the user token from window.localStorage
    const auth0_token = window.localStorage.getItem('auth0_token');
    return auth0_token ? JSON.parse(window.localStorage.auth0_token) : {};
  }

  static isTokenExpired() {
    const token = AuthService.getToken();
    if (!token) return true;

    const date = new Date(0);
    date.setUTCSeconds(token.expiresAt);

    return !(date.valueOf() > (new Date().valueOf()));
  }
}
