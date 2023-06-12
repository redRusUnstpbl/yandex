export const SET_MODAL = "SET_MODAL";
export const CLEAR_MODAL = "CLEAR_MODAL";

export const showModal = (id) => ({
  type: SET_MODAL,
  id: id
});

export const closeModal = () => ({
  type: CLEAR_MODAL
});