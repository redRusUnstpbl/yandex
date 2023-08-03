export const SET_MODAL: "SET_MODAL" = "SET_MODAL";
export const CLEAR_MODAL: "CLEAR_MODAL" = "CLEAR_MODAL";

export interface IShowModalAction {
  readonly type: typeof SET_MODAL;
  readonly id: number | string;
}

export interface ICloseModalAction {
  readonly type: typeof CLEAR_MODAL;
}

export type TDetailActions = 
  | IShowModalAction
  | ICloseModalAction;

export const showModal = (id: number | string): IShowModalAction => ({
  type: SET_MODAL,
  id: id
});

export const closeModal = (): ICloseModalAction => ({
  type: CLEAR_MODAL
});