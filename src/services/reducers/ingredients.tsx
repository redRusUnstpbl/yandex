import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCR_INGREDIENT,
  DECR_INGREDIENT,
  REMOVE_INGREDIENT,
  REMOVE_ALL_INGREDIENT
} from '../actions/ingredients';

import type { TIngredient } from "../../utils/types";
import type { TIngredientsActions } from '../actions/ingredients';

type TIngredietsState = {
  items: ReadonlyArray<TIngredient>;
  itemsRequest: boolean;
  itemsFailed: boolean;
}

export const initialState: TIngredietsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false, 
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredietsState => {
  switch (action.type) {
    case INCR_INGREDIENT: {
      return {
        ...state,
        items: state.items.map(function(item: TIngredient) {
          let cnt = item.cnt ?? 0;
          if (item._id === action.item._id) {
            cnt += action.item.type === 'bun' ? 2 : 1;
          }
          
          return {
            ...item,
            cnt: cnt
          };
        })
      }
    }
    case DECR_INGREDIENT: {
      return {
        ...state,
        items: state.items.map(function(item: TIngredient) {
          let cnt = item.cnt ?? 0;
          if (item._id === action.item._id) {
            cnt -= action.item.type === 'bun' ? 2 : 1;
          }
          
          return {
            ...item,
            cnt: cnt
          };
        })
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        items: state.items.map(function(item: TIngredient) {
          return {
            ...item,
            cnt: 0
          };
        })
      }
    }
    case REMOVE_ALL_INGREDIENT: {
      return {
        ...state,
        items: state.items.map(function(item: TIngredient) {
          return {
            ...item,
            cnt: 0
          };
        })
      }
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items.map((item: TIngredient) => {
          return {
            ...item, 
            cnt: 0
          }
        }),        
        itemsRequest: false,
        itemsFailed: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true
      }
    }
    default: {
      return state;
    }
  }
}