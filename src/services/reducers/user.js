import {
  SET_IS_REQUEST,
  SET_IS_FAILED,
  SET_CLEAR_ERROR,
  SET_AUTH_CHECKED,
  SET_REGISTER,
  SET_LOGIN,
  SET_LOGOUT,
  SET_USER,
  SET_USER_UPDATE,
  SET_PASSWORD_FORGOT,
  SET_PASSWORD_RESET
} from '../actions/user';

const initialState = {
  user: null,
  isAuthChecked: false,
  isRequest: {},
  isFailed: {},
};

function filterKey(obj, value) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => key !== value)
  )
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_REQUEST:
      if (!state.isRequest[action.request]) {
        return {
          ...state,
          isRequest: {
            ...state.isRequest,
            [action.request]: 'Загрузка...'
          },
          isFailed: filterKey(state.isFailed, action.request)
        }
      }
    case SET_IS_FAILED:
      if (!state.isFailed[action.request]) {
        return {
          ...state,
          isRequest: filterKey(state.isRequest, action.request),
          isFailed: {
            ...state.isFailed,
            [action.request]: action.error ?? ''
          }
        }
      }
    case SET_CLEAR_ERROR:
      if (state.isFailed[action.key]) {
        return {
          ...state,
          isAuthChecked: state.isAuthChecked,
          isFailed: filterKey(state.isFailed, action.key),
        }
      }
      return {
        ...state
      }
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      }
    case SET_LOGIN:
      return {
        ...state,
        user: action.user,
        isAuthChecked: true,
        isRequest: filterKey(state.isRequest, SET_LOGIN),
        isFailed: filterKey(state.isFailed, SET_LOGIN)
      }
    case SET_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthChecked: true,
        isRequest: filterKey(state.isRequest, SET_LOGOUT),
        isFailed: filterKey(state.isFailed, SET_LOGOUT)
      }
    case SET_REGISTER:
      return {
        ...state,
        user: action.user,
        isAuthChecked: true,
        isRequest: filterKey(state.isRequest, SET_REGISTER),
        isFailed: filterKey(state.isFailed, SET_REGISTER)
      }
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthChecked: true,
        isRequest: filterKey(state.isRequest, SET_USER),
        isFailed: filterKey(state.isFailed, SET_USER),
      }
    case SET_USER_UPDATE:
      return {
        ...state,
        user: action.user,
        isRequest: filterKey(state.isRequest, SET_USER_UPDATE),
        isFailed: filterKey(state.isFailed, SET_USER_UPDATE),
      }
    case SET_PASSWORD_FORGOT:
      return {
        ...state,
        isRequest: filterKey(state.isRequest, SET_PASSWORD_FORGOT),
        isFailed: filterKey(state.isFailed, SET_PASSWORD_FORGOT),
      }
    case SET_PASSWORD_RESET:
      return {
        ...state,
        isRequest: filterKey(state.isRequest, SET_PASSWORD_RESET),
        isFailed: filterKey(state.isFailed, SET_PASSWORD_RESET),
      }
    default:
      return state;
  }
};