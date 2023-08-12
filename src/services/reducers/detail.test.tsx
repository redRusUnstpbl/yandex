import { detailReducer, initialState } from "./detail";
import {
  SET_MODAL,
  CLEAR_MODAL
} from '../actions/detail';

describe('Detail reducer test', () => {
  it('should SET_MODAL', () => {
    expect(detailReducer(initialState, {
      type: SET_MODAL,
      id: 1
    })).toEqual({ 
      id: 1
    });
  });

  it('should CLEAR_MODAL', () => {
    expect(detailReducer({
      id: 1
    }, {
      type: CLEAR_MODAL,
    })).toEqual({
      id: null
    });
  });
});