import { v4 as uuidv4 } from 'uuid';

export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const MOVE_CONSTRUCTOR_INGREDIENT = "MOVE_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const CLEAR_CONSTRUCTOR_INGREDIENT = "CLEAR_CONSTRUCTOR_INGREDIENT";

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR_INGREDIENT
});

export const moveElementInConstructor = (indexDrag, indexHover) => ({
  type: MOVE_CONSTRUCTOR_INGREDIENT,
  indexDrag: indexDrag,
  indexHover: indexHover
});

export const addElementToConstructor = (item) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  item: item,
  index: uuidv4()
});

export const removeElementFromConstructor = (index) => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  index: index
});