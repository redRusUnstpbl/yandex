export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const INCR_INGREDIENT = "INCR_INGREDIENT";
export const DECR_INGREDIENT = "DECR_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export function incrIngredient(item) {
  return function (dispatch) {
    dispatch({
      type: INCR_INGREDIENT,
      item: item
    });
  }
}

export function decrIngredient(item) {
  return function (dispatch) {
    dispatch({
      type: DECR_INGREDIENT,
      item: item
    });
  }
}

export function removeIngredient(item) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_INGREDIENT,
      item: item
    });
  }
}

export function getIngredients(url) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    fetch(url)
      .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
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