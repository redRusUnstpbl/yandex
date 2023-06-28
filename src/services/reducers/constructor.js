import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR_INGREDIENT
} from "../actions/constructor";

const initialState = {
  items: [],
  bun: null
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        items: [],
        bun: null
      }
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const items = [...state.items];
      items.splice(action.indexDrag, 0, items.splice(action.indexHover, 1)[0]); 

      return {
        ...state,
        items: [
          ...items
        ]
      }
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.item.type === 'bun') {
        return {
          ...state,
          bun: action.item
        }
      }

      let itemResult = action.item;
      itemResult['key'] = action.index;
    
      return {
        ...state,
        items: state.items.concat(itemResult)
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      if (action.index === -1) {
        return {
          ...state,
          bun: null
        }
      }

      return {
        ...state,
        items: [...state.items].filter((item, index) => index !== action.index)
      }
    }
    default: {
      return state;
    }
  }
}