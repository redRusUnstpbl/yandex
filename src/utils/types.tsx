export enum TabTypes {
  bun = 'bun',
  sauce = "sauce",
  main = "main"
}

export type TTabData = {
  'type': string,
  'title': string,
  'data': TIngredient[],
  'handleSetTab': (info: THandleTabInfo) => void,
  'containerRef': any,
  'scrollTop': number,
};

export type THandleTabInfo = {
  'top': number,
  'heigth': number,
  'type': string,
};

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  key: string;
  cnt?: number
}

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]?: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};


export interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}