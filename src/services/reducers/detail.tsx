import {
  SET_MODAL,
  CLEAR_MODAL
} from '../actions/detail';

import type { TDetailActions } from '../actions/detail';

type TDetailState = {
  readonly id: number | string | null;
}

export const initialState: TDetailState = {
  id: null,
};

export const detailReducer = (state = initialState, action: TDetailActions): TDetailState => {
  switch (action.type) {
    case SET_MODAL: {
      return {
        ...state,
        id: action.id
      };
    }
    case CLEAR_MODAL: {
      return {
        ...state,
        id: null
      };
    }
    default: {
      return state;
    }
  }
}