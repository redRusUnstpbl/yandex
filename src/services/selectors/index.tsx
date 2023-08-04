import { RootState } from "../reducers";

export const getDataModal = (state: RootState) => state.detail;
export const getDataOrder = (state: RootState) => state.order;
export const getDataMain = (state: RootState) => state.construct.items;
export const getDataBun = (state: RootState) => state.construct.bun;
export const getUser = (state: RootState) => state.user;
export const getWs = (state: RootState) => state.ws;
export const getWsd = (state: RootState) => state.wsd
export const getIngredients = (state: RootState) => state.ingredients;