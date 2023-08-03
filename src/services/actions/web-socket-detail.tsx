import { AppThunk, AppDispatch } from "../reducers";
import { checkResponse } from "../../utils/api";
import { TOrder } from "../../utils/types";
export const SET_IS_REQUEST: "SET_IS_REQUEST" = "SET_IS_REQUEST";
export const SET_IS_FAILED: "SET_IS_FAILED" = "SET_IS_FAILED";
export const SET_DETAIL: "SET_DETAIL" = "SET_DETAIL";
export const REMOVE_DETAIL: "REMOVE_DETAIL" = "REMOVE_DETAIL";

export interface ISetIsRequestAction {
  readonly type: typeof SET_IS_REQUEST;
}

export interface ISetIsFailedAction {
  readonly type: typeof SET_IS_FAILED;
}

export interface ISetDetailAction {
  readonly type: typeof SET_DETAIL;
  readonly payload: TOrder;
};

export interface IRemoveDetailAction {
  readonly type: typeof REMOVE_DETAIL;
}

export type TWSDActions =
  | ISetIsRequestAction
  | ISetIsFailedAction
  | ISetDetailAction
  | IRemoveDetailAction;


export const setDetailWSD = (payload: TOrder): ISetDetailAction => ({
  type: SET_DETAIL,
  payload: payload
});

export const getDetailWSD: AppThunk = (url: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_IS_REQUEST
    });

    fetch(url)
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SET_DETAIL,
          payload: res.orders[0]
        });
      })
      .catch(e => {
        dispatch({
          type: SET_IS_FAILED
        });
      });
  }
}