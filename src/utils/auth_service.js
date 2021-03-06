import Auth0Lock from "auth0-lock";

const config = {
  CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
  AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE,
  LOGO_URL: process.env.REACT_APP_AUTH0_LOGO_URL,
  REDIRECT_URL: process.env.REACT_APP_AUTH0_REDIRECT_URL,
};

const authConfig = {
  redirectUrl: config.REDIRECT_URL,
  responseType: "token id_token",
  audience: config.AUDIENCE,
  scope: "openid profile email",
};

export default class AuthService {
  constructor() {
    // Configure Auth0 lock
    this.lock = new Auth0Lock(config.CLIENT_ID, config.DOMAIN, {
      auth: authConfig,
      theme: {
        primaryColor: "#31324F",
        logo: config.LOGO_URL,
      },
      languageDictionary: {
        title: "CHALUPA.IO",
      },
      allowShowPassword: true,
      allowAutocomplete: true,
      autoclose: true,
      socialButtonStyle: "small",
    });
    // Binds logIn/signUp functions to keep this context
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.setupAuthentication = this.setupAuthentication.bind(this);
    this.setupErrorHandling = this.setupErrorHandling.bind(this);
    this.postLogin = this.postLogin.bind(this);
  }

  // ======================================================
  // Public methods
  // ======================================================
  logIn() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  signUp() {
    this.lock.show({
      initialScreen: "signUp",
    });
  }

  // user is logged in but expired, need to refresh the token
  checkSession(loginSuccess, loginError) {
    if (AuthService.tokenExists() && !AuthService.loggedIn()) {
      this.lock.checkSession(authConfig, (err, authResult) => {
        if (err) {
          AuthService.clearStorage();
          loginError(err);
        } else {
          this.postLogin(authResult, loginSuccess);
        }
      });
    }
  }

  // Add callback for lock's `authenticated` event
  setupAuthentication(loginSuccess) {
    this.lock.on("authenticated", authResult => {
      this.postLogin(authResult, loginSuccess);
    });
  }

  // Add callback for lock's `authorization_error` event
  setupErrorHandling(loginError, history) {
    this.lock.on("authorization_error", error => {
      loginError(error);
      return history.push({ pathname: "/" });
    });
  }

  // Shared logic for post login (after signup, login, refresh session)
  postLogin(authResult, loginSuccess) {
    AuthService.login(authResult); // static method

    const headers = {
      Authorization: `Bearer ${authResult.accessToken}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    };

    fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`, {
      headers,
    })
      .then(response => response.json())
      .then(json => {
        // new account
        if (json.data === "") {
          const holdings = localStorage.getItem("portfolio.holdings");
          if (holdings) {
            fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`, {
              headers,
              method: "POST",
              body: JSON.stringify({ holdings: holdings }),
            });
          }
        } else {
          // load stored holdings
          localStorage.setItem("portfolio.holdings", json.data);
        }
        return loginSuccess(authResult.idTokenPayload);
      });
    // return this.props.history.push({ pathname: '/' });
  }

  // ======================================================
  // Static methods
  // ======================================================
  static clearOldNonces() {
    Object.keys(localStorage).forEach(key => {
      if (!key.startsWith("com.auth0.auth")) {
        return;
      }
      localStorage.removeItem(key);
    });
  }

  static login(authResult) {
    AuthService.setAccessToken(authResult.accessToken);
    AuthService.setAuthResult(authResult);
    AuthService.setProfile(authResult.idTokenPayload);
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !AuthService.isTokenExpired();
  }

  static clearStorage() {
    // Clear user token, auth result, and profile data from window.localStorage
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("auth_result");
    window.localStorage.removeItem("profile");
  }

  static logout() {
    AuthService.clearStorage();
  }

  // accessToken
  static getAccessToken() {
    // Retrieves the user token from window.localStorage
    const access_token = window.localStorage.getItem("access_token");
    return access_token ? access_token : "";
  }

  static setAccessToken(accessToken) {
    // Saves profile data to window.localStorage
    window.localStorage.setItem("access_token", accessToken);
    // Triggers profile_updated event to update the UI
  }

  // profile
  static getProfile() {
    // Retrieves the profile data from window.localStorage
    const profile = window.localStorage.getItem("profile");
    return profile ? JSON.parse(window.localStorage.profile) : {};
  }

  static setProfile(profile) {
    // Saves profile data to window.localStorage
    window.localStorage.setItem("profile", JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
  }

  // authResult
  static getAuthResult() {
    // Retrieves the auth result from window.localStorage
    const auth_result = window.localStorage.getItem("auth_result");
    return auth_result ? JSON.parse(window.localStorage.auth_result) : false;
  }

  static setAuthResult(authResult) {
    // Saves auth result to window.localStorage
    window.localStorage.setItem(
      "auth_result",
      JSON.stringify(
        Object.assign(authResult, {
          expiresAt: authResult.expiresIn * 1000 + Date.now(),
        }),
      ),
    );
  }

  static tokenExists() {
    return !!window.localStorage.getItem("auth_result");
  }

  static isTokenExpired() {
    const token = AuthService.getAuthResult();
    if (!token) {
      return true;
    }

    const date = new Date(token.expiresAt);

    return !(date.valueOf() > new Date().valueOf());
  }
}
