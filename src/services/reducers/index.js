import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { detailReducer } from './detail';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    detail: detailReducer,
    construct: constructorReducer,
    order: orderReducer,
    user: userReducer
});