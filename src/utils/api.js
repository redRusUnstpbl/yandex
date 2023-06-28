export const API = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err))
  }
}