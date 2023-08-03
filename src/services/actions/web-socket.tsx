import type { TOrder } from "../../utils/types";
export const CONNECT: "CONNECT" = "CONNECT";
export const DISCONNECT: "DISCONNECT" = "DISCONNECT";

export const WS_CONNECTING: "WS_CONNECTING" = "WS_CONNECTING";
export const WS_CONNECTION_OPEN: "WS_CONNECTION_OPEN" = "WS_CONNECTION_OPEN";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";


export type TWSData = {
    success: boolean;
    message?: string;
    orders?: TOrder[];
    total?: number;
    totalToday?: number;
}

export interface IWSConnectAction {
    readonly type: typeof CONNECT;
    readonly payload:  string
}

export interface IWSDisconnectAction {
    readonly type: typeof DISCONNECT;
}

export interface IWSConnectingAction {
    readonly type: typeof WS_CONNECTING;
}

export interface IWSConnectionOpenAction {
    readonly type: typeof WS_CONNECTION_OPEN;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
}

export interface IWSConnectionCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWSData
}

export type TWSActions =
    | IWSConnectAction
    | IWSDisconnectAction
    | IWSConnectingAction
    | IWSConnectionOpenAction
    | IWSConnectionErrorAction
    | IWSConnectionCloseAction
    | IWSGetMessageAction;


export const wsConnect = (url: string): IWSConnectAction => ({
    type: CONNECT,
    payload: url
});

export const wsDisconnect = (): IWSDisconnectAction => ({
    type: DISCONNECT,
});

export const wsConnecting = (): IWSConnectingAction => ({
    type: WS_CONNECTING,
});

export const wsOpen = (): IWSConnectionOpenAction => ({
    type: WS_CONNECTION_OPEN,
});

export const wsClose = (): IWSConnectionCloseAction => ({
    type: WS_CONNECTION_CLOSE,
});

export const wsError = (error: string): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR,
    payload: error
});

export const wsMessage = (data: TWSData): IWSGetMessageAction => ({
    type: WS_GET_MESSAGE,
    payload: data
});