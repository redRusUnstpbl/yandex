import { constructorReducer, initialState } from "./constructor";
import { 
  addElementToConstructor,
  removeElementFromConstructor,
  clearConstructor 
} from "../actions/constructor";

import type { TIngredient } from "../../utils/types";

const ingredient: TIngredient = {
  "_id":"111",
  "name":"Краторная булка N-200i",
  "type":"bun",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"image",
  "image_mobile":"mobile",
  "image_large":"large",
  "key": '123'
}

describe('Constructor reducer test', () => {
  it('should ADD_CONSTRUCTOR_INGREDIENT (bun)', () => {
    let state = {
      ...initialState
    }

    const result = constructorReducer(state, addElementToConstructor(ingredient));
    
    expect(result).toEqual({ 
      ...initialState,
      bun: ingredient
    });
  });

  it('should REMOVE_CONSTRUCTOR_INGREDIENT (bun)', () => {
    let state = {
      ...initialState
    }

    const result = constructorReducer(state, removeElementFromConstructor(0));

    expect(result).toEqual({ 
      ...initialState,
      bun: null
    })
  });

  
  it('should ADD_CONSTRUCTOR_INGREDIENT (other)', () => {
    ingredient.type = 'sause';
    let state = {
      ...initialState
    }

    const result = constructorReducer(state, addElementToConstructor(ingredient));
    
    expect(result).toEqual({ 
      ...initialState,
      items: [ingredient]
    });
  });

  it('should REMOVE_CONSTRUCTOR_INGREDIENT (other)', () => {
    ingredient.type = 'sause';
    let state = {
      ...initialState,
      items: [ingredient]
    }
  
    const result = constructorReducer(state, removeElementFromConstructor(0));
    
    expect(result).toEqual({ 
      bun: null,
      items: []
    })
  });

  it('should CLEAR_CONSTRUCTOR_INGREDIENT', () => {
    let state = {
      bun: ingredient,
      items: [ingredient]
    }

    const result = constructorReducer(state, clearConstructor());
    
    expect(result).toEqual({ 
      bun: null,
      items: []
    })
  })
})