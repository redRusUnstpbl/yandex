import {
  SET_MODAL,
  CLEAR_MODAL
} from '../actions/detail';

const initialState = {
  id: null,
};

export const detailReducer = (state = initialState, action) => {
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