import { checkResponse } from "../../utils/api";
import { AppThunk } from "../reducers";
import type { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const INCR_INGREDIENT: "INCR_INGREDIENT" = "INCR_INGREDIENT";
export const DECR_INGREDIENT: "DECR_INGREDIENT" = "DECR_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";
export const REMOVE_ALL_INGREDIENT: "REMOVE_ALL_INGREDIENT" = "REMOVE_ALL_INGREDIENT";

export interface IIncrIngredientAction {
  readonly type: typeof INCR_INGREDIENT;
  readonly item: TIngredient;
}

export interface IDecrIngredientAction {
  readonly type: typeof DECR_INGREDIENT;
  readonly item: TIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly item: TIngredient;
}

export interface IRemoveAllIngredientsAction {
  readonly type: typeof REMOVE_ALL_INGREDIENT;
}

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: ReadonlyArray<TIngredient>
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = 
  | IIncrIngredientAction
  | IDecrIngredientAction
  | IRemoveIngredientAction
  | IRemoveAllIngredientsAction
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const incrIngredient = (item: TIngredient): IIncrIngredientAction => ({
  type: INCR_INGREDIENT,
  item: item
})

export const decrIngredient = (item: TIngredient): IDecrIngredientAction => ({
  type: DECR_INGREDIENT,
  item: item
})

export const removeIngredient = (item: TIngredient): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  item: item
});

export const removeAllIngredients = (): IRemoveAllIngredientsAction => ({
  type: REMOVE_ALL_INGREDIENT
});

export const getIngredients: AppThunk = (url: string) => {
  return function (dispatch) {
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