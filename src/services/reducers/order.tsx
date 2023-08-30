import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/order';

import type { TOrder } from '../../utils/types';
import type { TOrderActions } from '../actions/order';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

export const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false, 
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        order: null,
        orderRequest: true,
        orderFailed: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,       
        orderRequest: false,
        orderFailed: false
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        orderRequest: false,
        orderFailed: true
      }
    }
    default: {
      return state;
    }
  }
}