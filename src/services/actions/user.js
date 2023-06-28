import { API } from "../../utils/api";
import { setCookie, getCookie } from "../utils";
import { checkResponse } from "../../utils/api";

export const SET_IS_REQUEST = "SET_IS_REQUEST";
export const SET_IS_FAILED = "SET_IS_FAILED";
export const SET_CLEAR_ERROR = "SET_CLEAR_ERROR";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_REGISTER = 'SET_REGISTER';
export const SET_USER = 'SET_USER';
export const SET_USER_UPDATE = 'SET_USER_UPDATE';
export const SET_PASSWORD_FORGOT = 'SET_PASSWORD_FORGOT';
export const SET_PASSWORD_RESET = 'SET_PASSWORD_RESET';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setErrorClear = (key) => ({
  type: SET_CLEAR_ERROR,
  key: key,
});

export function checkUserAuth() {
  return function (dispatch) {
    if (getCookie('accessToken')) {
      dispatch({
        type: SET_IS_REQUEST,
        request: SET_USER
      });

      fetch(API + '/auth/user', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: getCookie('accessToken')
        },
      })
        .then(checkResponse)
        .then(res => {
          dispatch({
            type: SET_USER,
            user: res.user,
          });
        })
        .catch(e => {
          if (e.message === 'jwt expired') {
            dispatch(refreshToken());
          } else {
            dispatch({
              type: SET_IS_FAILED,
              request: SET_USER,
              error: e.message ?? 'Error is undefined'
            });
            dispatch(setAuthChecked(true));
          }
        });

    } else {
      dispatch(setAuthChecked(true));
    }
  }
}

export function refreshToken() {
  return function (dispatch) {
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_REFRESH_TOKEN
    });

    fetch(API + '/auth/token', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
      .then(checkResponse)
      .then(res => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_REFRESH_TOKEN,
          error: e.message ?? 'Error is undefined'
        });
        dispatch(setAuthChecked(true));
      });
  }
}

export function register(data) {
  return function (dispatch) {
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_REGISTER
    });

    fetch(API + '/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);

        dispatch({
          type: SET_REGISTER,
          user: res.user,
        });
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_REGISTER,
          error: e.message ?? 'Error is undefined'
        });
      });
  }
}

export function login(data) {
  return function (dispatch) {
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_LOGIN
    });

    fetch(API + '/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);

        dispatch({
          type: SET_LOGIN,
          user: res.user,
        });
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_LOGIN,
          error: e.message ?? 'Error is undefined'
        });
      });
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_LOGOUT
    });

    fetch(API + '/auth/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
      .then(checkResponse)
      .then(res => {
        setCookie("accessToken", null);
        setCookie("refreshToken", null);

        dispatch({
          type: SET_LOGOUT,
        });
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_LOGOUT,
          error: e.message ?? 'Error is undefined'
        });
      });
  }
}


export const updateUser = (data) => async (dispatch) => {
  await Promise.all([
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_USER_UPDATE
    }),

    fetch(API + '/auth/user', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie('accessToken')
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SET_USER_UPDATE,
          user: res.user,
        });
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_USER_UPDATE,
          error: e.message ?? 'Error is undefined'
        });
      })
  ]);
}

export const forgotPassword = (data) => async (dispatch) => {
  return await new Promise((resolve) => {
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_PASSWORD_FORGOT
    });

    fetch(API + '/password-reset', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SET_PASSWORD_FORGOT,
        });

        resolve(res);
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_PASSWORD_FORGOT,
          error: e.message ?? 'Error is undefined'
        });

        resolve(e);
      })
  })
}

export const resetPassword = (data) => async (dispatch) => {
  return await new Promise((resolve) => {
    dispatch({
      type: SET_IS_REQUEST,
      request: SET_PASSWORD_RESET
    });

    fetch(API + '/password-reset/reset', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SET_PASSWORD_RESET,
        });

        resolve(res);
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED,
          request: SET_PASSWORD_RESET,
          error: e.message ?? 'Error is undefined'
        });

        resolve(e);
      })
  })
}