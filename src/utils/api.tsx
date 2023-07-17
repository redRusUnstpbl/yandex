export const API = 'https://norma.nomoreparties.space/api';

export function checkResponse(res: {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): any;
}) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err: any) => Promise.reject(err))
  }
}