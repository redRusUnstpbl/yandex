import { v4 as uuidv4 } from 'uuid';
import type { TIngredient } from '../../utils/types';

export const ADD_CONSTRUCTOR_INGREDIENT: "ADD_CONSTRUCTOR_INGREDIENT" = "ADD_CONSTRUCTOR_INGREDIENT";
export const MOVE_CONSTRUCTOR_INGREDIENT: "MOVE_CONSTRUCTOR_INGREDIENT" = "MOVE_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT: "REMOVE_CONSTRUCTOR_INGREDIENT" = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const CLEAR_CONSTRUCTOR_INGREDIENT: "CLEAR_CONSTRUCTOR_INGREDIENT" = "CLEAR_CONSTRUCTOR_INGREDIENT";

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENT;
}

export interface IMoveConstructorAction {
  readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
  readonly indexDrag: number;
  readonly indexHover: number;
}

export interface IRemoveConstructor {
  readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
  readonly index: number;
}

export interface IAddElementToConstructor {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  readonly item: TIngredient;
  readonly index: string;
}

export type TConstructorActions = 
  | IClearConstructorAction
  | IMoveConstructorAction
  | IRemoveConstructor
  | IAddElementToConstructor;

export const clearConstructor = (): IClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR_INGREDIENT
});

export const moveElementInConstructor = (indexDrag: number, indexHover: number): IMoveConstructorAction => ({
  type: MOVE_CONSTRUCTOR_INGREDIENT,
  indexDrag: indexDrag,
  indexHover: indexHover
});

export const removeElementFromConstructor = (index: number): IRemoveConstructor => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  index: index
});

export const addElementToConstructor = (item: TIngredient): IAddElementToConstructor => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  item: item,
  index: uuidv4()
});

