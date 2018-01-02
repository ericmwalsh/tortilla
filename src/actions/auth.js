export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';


export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
