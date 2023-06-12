export const SET_MODAL = "SET_MODAL";
export const CLEAR_MODAL = "CLEAR_MODAL";

export function showModal(id) {
  return function (dispatch) {
    dispatch({
      type: SET_MODAL,
      id: id
    });
  }
}

export function closeModal() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_MODAL,
    });
  }
}