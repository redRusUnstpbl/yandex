import { ThunkAction } from 'redux-thunk';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { combineReducers, Action, ActionCreator } from 'redux';
import { ingredientsReducer } from './ingredients';
import { detailReducer } from './detail';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './web-socket';
import { wsdReducer } from './web-socket-detail';

import { store } from '../store';
import { TConstructorActions } from '../actions/constructor';
import { TDetailActions } from '../actions/detail';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/web-socket';
import { TWSDActions } from '../actions/web-socket-detail';

import type {} from "redux-thunk/extend-redux";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  detail: detailReducer,
  construct: constructorReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer,
  wsd: wsdReducer,
});

type TApplicationActions = 
    | TConstructorActions
    | TDetailActions
    | TIngredientsActions
    | TOrderActions
    | TUserActions
    | TWSActions
    | TWSDActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;