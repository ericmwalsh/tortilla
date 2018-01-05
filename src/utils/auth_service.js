import Auth0Lock from 'auth0-lock';

export default class AuthService {
  constructor() {
    const config = {
      CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
      REDIRECT_URL: 'http://localhost:4000/callback',
      LOGO_URL: process.env.REACT_APP_AUTH0_LOGO_URL
    }

    // Configure Auth0 lock
    this.lock = new Auth0Lock(
      config.CLIENT_ID,
      config.DOMAIN,
      {
        auth: {
          // redirectUrl: config.REDIRECT_URL,
          responseType: 'token',
        },
        theme: {
          primaryColor: '#31324F',
          logo: config.LOGO_URL,
        },
        languageDictionary: {
          title: 'Coinucopio',
        },
        allowShowPassword: true,
        autoclose: true,
        socialButtonStyle: 'small',
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
  static clearOldNonces() {
    Object.keys(localStorage).forEach( key => {
      if(!key.startsWith('com.auth0.auth')) return;
      localStorage.removeItem(key);
    });
  }

  static login(authResult, profile) {
    AuthService.setAccessToken(authResult.accessToken);
    AuthService.setAuthResult(authResult);
    AuthService.setProfile(profile);
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !AuthService.isTokenExpired();
  }

  static logout() {
    // Clear user token, auth result, and profile data from window.localStorage
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('auth_result');
    window.localStorage.removeItem('profile');
  }


  // accessToken
  static getAccessToken() {
    // Retrieves the user token from window.localStorage
    const access_token = window.localStorage.getItem('access_token');
    return access_token ? access_token : '';
  }

  static setAccessToken(accessToken) {
    // Saves profile data to window.localStorage
    window.localStorage.setItem('access_token', accessToken);
    // Triggers profile_updated event to update the UI
  }


  // profile
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


  // authResult
  static getAuthResult() {
    // Retrieves the auth result from window.localStorage
    const auth_result = window.localStorage.getItem('auth_result');
    return auth_result ? JSON.parse(window.localStorage.auth_result) : {};
  }

  static setAuthResult(authResult) {
    // Saves auth result to window.localStorage
    window.localStorage.setItem(
      'auth_result',
      JSON.stringify(Object.assign(authResult, {expiresAt: authResult.expiresIn * 1000 + Date.now()}))
    );
  }




  static isTokenExpired() {
    const token = AuthService.getAuthResult();
    if (!token) return true;

    const date = new Date(0);
    date.setUTCSeconds(token.expiresAt);

    return !(date.valueOf() > (new Date().valueOf()));
  }
}
