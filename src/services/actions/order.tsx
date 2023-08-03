import { clearConstructor } from "./constructor";
import { removeAllIngredients } from "./ingredients";
import { checkResponse } from "../../utils/api";
import { AppThunk, AppDispatch } from "../reducers";
import type { TOrder } from "../../utils/types";
import { getCookie } from "../utils";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions = 
  | IGetOrderRequestAction 
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

export const getOrder: AppThunk = (url: string, data: {'ingredients': number[]}) => async (dispatch: AppDispatch) => {
  return await new Promise((resolve) => {
    const accessToken = getCookie('accessToken');

    dispatch({
      type: GET_ORDER_REQUEST
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': accessToken as string,
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        dispatch(clearConstructor());
        dispatch(removeAllIngredients());
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order,
        });

        resolve(res);
      })
      .catch(e => {
        dispatch({
          type: GET_ORDER_FAILED
        });

        resolve(e);
      });
  })
}
