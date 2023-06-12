import { v4 as uuidv4 } from 'uuid';

export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const MOVE_CONSTRUCTOR_INGREDIENT = "MOVE_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";

export function moveElementInConstructor(indexDrag, indexHover) {
  return function (dispatch) {
    dispatch({
      type: MOVE_CONSTRUCTOR_INGREDIENT,
      indexDrag: indexDrag,
      indexHover: indexHover
    });
  }
}

export function addElementToConstructor(item) {
  return function (dispatch) {
    dispatch({
      type: ADD_CONSTRUCTOR_INGREDIENT,
      item: item,
      index: uuidv4(),
    });
  }
}

export function removeElementFromConstructor(index) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      index: index
    });
  }
}
