import { userReducer, initialState } from "./user";
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
import type { TUser } from "../../utils/types";

const user: TUser = {
  email: 'test@test.ru',
  name: 'test'
}

describe('User reducer test', () => {
  it('should SET_IS_REQUEST', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_IS_REQUEST,
      request: 'USER'
    });

    expect(result).toEqual({ 
      ...initialState,
      isRequest: {
        USER: 'Загрузка...'
      }
    });
  });

  it('should SET_IS_FAILED', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_IS_FAILED,
      request: 'USER',
      error: 'Ошибка'
    });

    expect(result).toEqual({ 
      ...initialState,
      isFailed: {
        'USER': 'Ошибка'
      }
    });
  });

  it('should SET_CLEAR_ERROR', () => {
    let state = {
      ...initialState,
      isFailed: {
        'USER': 'Ошибка'
      }
    }

    const result = userReducer(state, {
      type: SET_CLEAR_ERROR,
      key: 'USER'
    });

    expect(result).toEqual({ 
      ...initialState,
    });
  });

  it('should SET_AUTH_CHECKED', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_AUTH_CHECKED,
      payload: true
    });

    expect(result).toEqual({ 
      ...initialState,
      isAuthChecked: true
    });
  });


  it('should SET_LOGIN', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_LOGIN,
      user: user
    });

    expect(result).toEqual({ 
      ...initialState,
      isAuthChecked: true,
      user: user
    });
  });

  it('should SET_LOGOUT', () => {
    let state = {
      ...initialState,
      isAuthChecked: true,
      user: user
    }

    const result = userReducer(state, {
      type: SET_LOGOUT,
    });

    expect(result).toEqual({ 
      ...initialState,
      isAuthChecked: true,
      user: null
    });
  });

  it('should SET_REGISTER', () => {
    let state = {
      ...initialState,
      isAuthChecked: true,
    }

    const result = userReducer(state, {
      type: SET_REGISTER,
      user: user,
    });

    expect(result).toEqual({ 
      ...initialState,
      isAuthChecked: true,
      user: user,
    });
  });

  it('should SET_USER', () => {
    let state = {
      ...initialState,
      isAuthChecked: true,
    }

    const result = userReducer(state, {
      type: SET_USER,
      user: user
    });

    expect(result).toEqual({ 
      ...initialState,
      isAuthChecked: true,
      user: user
    });
  });

  it('should SET_USER_UPDATE', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_USER_UPDATE,
      user: user
    });

    expect(result).toEqual({ 
      ...initialState,
      user: user
    });
  });

  it('should SET_PASSWORD_FORGOT', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_PASSWORD_FORGOT,
    });

    expect(result).toEqual({ 
      ...initialState,
    });
  });

  it('should SET_PASSWORD_RESET', () => {
    let state = {
      ...initialState,
    }

    const result = userReducer(state, {
      type: SET_PASSWORD_RESET,
    });

    expect(result).toEqual({ 
      ...initialState,
    });
  });
});