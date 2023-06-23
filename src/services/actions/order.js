export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrder(url, data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res,
        });
      })
      .catch(e => {
        dispatch({
          type: GET_ORDER_FAILED
        });
      });
  }
}