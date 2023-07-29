import { clearConstructor } from "./constructor";
import { removeAllIngredients } from "./ingredients";
import { checkResponse } from "../../utils/api";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const getOrder: any = (url: string, data: {'ingredients': number[]}) => async (dispatch:any) => {
  return await new Promise((resolve) => {
    dispatch({
      type: GET_ORDER_REQUEST
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then(res => {
        dispatch(clearConstructor());
        dispatch(removeAllIngredients());
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res,
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
