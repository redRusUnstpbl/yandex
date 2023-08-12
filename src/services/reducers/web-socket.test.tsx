import { wsReducer, initialState } from "./web-socket";
import {
  WS_CONNECTING,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
} from "../actions/web-socket";

import type { TWSData } from "../actions/web-socket";

const data: TWSData = {
  success: true,
  orders: [],
  total: 10,
  totalToday: 5,
}

describe('Web-socket reducer test', () => {
  it('should WS_CONNECTING', () => {
    let state = {
      ...initialState,
    }

    const result = wsReducer(state, {
      type: WS_CONNECTING,
    });

    expect(result).toEqual({
      ...initialState,
      status: "CONNECTING",
      error: null
    });
  });

  it('should WS_CONNECTION_OPEN', () => {
    let state = {
      ...initialState,
    }

    const result = wsReducer(state, {
      type: WS_CONNECTION_OPEN,
    });

    expect(result).toEqual({
      ...initialState,
      status: "ONLINE",
      error: null
    });
  });

  it('should WS_CONNECTION_CLOSE', () => {
    let state = {
      ...initialState,
    }

    const result = wsReducer(state, {
      type: WS_CONNECTION_CLOSE,
    });

    expect(result).toEqual({
      ...initialState,
      status: "OFFLINE",
      error: null
    });
  });

  it('should WS_CONNECTION_ERROR', () => {
    let state = {
      ...initialState,
    }

    const result = wsReducer(state, {
      type: WS_CONNECTION_ERROR,
      payload: 'ошибка'
    });

    expect(result).toEqual({
      ...initialState,
      error: 'ошибка'
    });
  });

  it('should WS_GET_MESSAGE', () => {
    let state = {
      ...initialState,
    }

    const result = wsReducer(state, {
      type: WS_GET_MESSAGE,
      payload: data
    });

    expect(result).toEqual({
      ...initialState,
      error: null,
      orders: [],
      total: 10,
      totalToday: 5
    });
  });
});