import { ingredientsReducer, initialState } from "./ingredients"
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

const ingredient: TIngredient = {
  "_id":"111",
  "name":"Краторная булка N-200i",
  "type":"main",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"image",
  "image_mobile":"mobile",
  "image_large":"large",
  "key": '123',
  "cnt": 0
}

describe('Ingredients reducer test', () => {
  it('should INCR_INGREDIENT', () => {
    let state = {
      ...initialState,
      items: [ingredient]
    }

    const result = ingredientsReducer(state, {
      type: INCR_INGREDIENT,
      item: ingredient
    });

    ingredient['cnt'] = 1;
    expect(result).toEqual({ 
      ...initialState,
      items: [ingredient]
    });
  });

  it('should DECR_INGREDIENT', () => {
    ingredient['cnt'] = 1;
    let state = {
      ...initialState,
      items: [ingredient]
    }

    const result = ingredientsReducer(state, {
      type: DECR_INGREDIENT,
      item: ingredient
    });

    ingredient['cnt'] = 0;
    expect(result).toEqual({ 
      ...initialState,
      items: [ingredient]
    });
  });

  it('should REMOVE_INGREDIENT', () => {
    ingredient['cnt'] = 1;
    let state = {
      ...initialState,
      items: [ingredient]
    }

    const result = ingredientsReducer(state, {
      type: REMOVE_INGREDIENT,
      item: ingredient
    });

    ingredient['cnt'] = 0;
    expect(result).toEqual({ 
      ...initialState,
      items: [ingredient]
    });
  });

  it('should REMOVE_ALL_INGREDIENT', () => {
    ingredient['cnt'] = 1;
    let state = {
      ...initialState,
      items: [ingredient]
    }

    const result = ingredientsReducer(state, {
      type: REMOVE_ALL_INGREDIENT,
    });

    ingredient['cnt'] = 0;
    expect(result).toEqual({ 
      ...initialState,
      items: [ingredient]
    });
  });

  it('should GET_INGREDIENTS_REQUEST', () => {
    let state = {
      ...initialState,
    }

    const result = ingredientsReducer(state, {
      type: GET_INGREDIENTS_REQUEST
    });

    expect(result).toEqual({
      ...initialState,
      itemsRequest: true
    });
  });

  it('should GET_INGREDIENTS_SUCCESS', () => {
    let state = {
      ...initialState,
    }

    const result = ingredientsReducer(state, {
      type: GET_INGREDIENTS_SUCCESS,
      items: [ingredient]
    });

    expect(result).toEqual({
      items: [ingredient],
      itemsRequest: false,
      itemsFailed: false
    });
  });

  it('should GET_INGREDIENTS_FAILED', () => {
    let state = {
      ...initialState,
    }

    const result = ingredientsReducer(state, {
      type: GET_INGREDIENTS_FAILED
    });

    expect(result).toEqual({
      ...initialState,
      itemsFailed: true
    });
  });
});

