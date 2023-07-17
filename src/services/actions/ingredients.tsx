import { checkResponse } from "../../utils/api";
import type { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const INCR_INGREDIENT = "INCR_INGREDIENT";
export const DECR_INGREDIENT = "DECR_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const REMOVE_ALL_INGREDIENT = "REMOVE_ALL_INGREDIENT";


export const incrIngredient = (item: TIngredient) => ({
  type: INCR_INGREDIENT,
  item: item
})

export const decrIngredient = (item: TIngredient) => ({
  type: DECR_INGREDIENT,
  item: item
})

export const removeIngredient = (item: TIngredient) => ({
  type: REMOVE_INGREDIENT,
  item: item
});

export const removeAllIngredients = () => ({
  type: REMOVE_ALL_INGREDIENT
});

export const getIngredients: any = (url: string) => {
  return function (dispatch: any) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    fetch(url)
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        });
      })
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      });
  }
}