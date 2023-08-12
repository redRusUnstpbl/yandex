import { orderReducer, initialState } from "./order";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/order';

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

describe('Order reducer test', () => {
  it('should GET_ORDER_REQUEST', () => {
    let state = {
      ...initialState,
    }

    const result = orderReducer(state, {
      type: GET_ORDER_REQUEST,
    });

    expect(result).toEqual({ 
      ...initialState,
      orderRequest: true
    });
  });

  it('should GET_ORDER_SUCCESS', () => {
    let state = {
      ...initialState,
    }

    const result = orderReducer(state, {
      type: GET_ORDER_SUCCESS,
      order: order
    });

    expect(result).toEqual({ 
      ...initialState,
      order: order
    });
  });

  it('should GET_ORDER_FAILED', () => {
    let state = {
      ...initialState,
    }

    const result = orderReducer(state, {
      type: GET_ORDER_FAILED,
    });

    expect(result).toEqual({ 
      ...initialState,
      orderFailed: true
    });
  })
});