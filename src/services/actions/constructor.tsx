import { v4 as uuidv4 } from 'uuid';
import type { TIngredient } from '../../utils/types';

export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const MOVE_CONSTRUCTOR_INGREDIENT = "MOVE_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const CLEAR_CONSTRUCTOR_INGREDIENT = "CLEAR_CONSTRUCTOR_INGREDIENT";

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR_INGREDIENT
});

export const moveElementInConstructor = (indexDrag: number, indexHover: number) => ({
  type: MOVE_CONSTRUCTOR_INGREDIENT,
  indexDrag: indexDrag,
  indexHover: indexHover
});

export const addElementToConstructor = (item: TIngredient) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  item: item,
  index: uuidv4()
});

export const removeElementFromConstructor = (index: number) => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  index: index
});