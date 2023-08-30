import { wsdReducer, initialState } from "./web-socket-detail";
import {
  SET_IS_REQUEST,
  SET_IS_FAILED,
  SET_DETAIL,
  REMOVE_DETAIL
} from '../actions/web-socket-detail';

import type { TOrder } from "../../utils/types";

const order: TOrder = {
  _id: "123",
  ingredients: [],
  status: 'done',
  name: 'test',
  createdAt: '',
  updatedAt: '',
  number: 111,
}

describe('Web-socket-detail reducer test', () => {
  it('should SET_IS_REQUEST', () => {
    let state = {
      ...initialState,
    }

    const result = wsdReducer(state, {
      type: SET_IS_REQUEST,
    });

    expect(result).toEqual({
      ...initialState,
      isRequest: true
    });
  });

  it('should SET_IS_FAILED', () => {
    let state = {
      ...initialState,
    }

    const result = wsdReducer(state, {
      type: SET_IS_FAILED,
    });

    expect(result).toEqual({
      ...initialState,
      isFailed: true
    });
  });

  it('should SET_DETAIL', () => {
    let state = {
      ...initialState,
    }

    const result = wsdReducer(state, {
      type: SET_DETAIL,
      payload: order
    });

    expect(result).toEqual({
      ...initialState,
      data: order
    });
  });

  it('should REMOVE_DETAIL', () => {
    let state = {
      ...initialState,
      data: order
    }

    const result = wsdReducer(state, {
      type: REMOVE_DETAIL,
    });

    expect(result).toEqual({
      ...initialState,
      data: null
    });
  });
});