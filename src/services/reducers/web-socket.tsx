import { 
    WS_CONNECTING,
    WS_CONNECTION_OPEN,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
} from "../actions/web-socket";


import type { TWSActions } from "../actions/web-socket";
import type { TOrder } from "../../utils/types";

type TWSState = {
    status: 'CONNECTING' | 'ONLINE' | 'OFFLINE';
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    error ?: string | null;
}

const initialState: TWSState = {
    status: 'OFFLINE',
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTING:
            return {
                ...state,
                status: "CONNECTING",
                error: null,
            }
        case WS_CONNECTION_OPEN: 
            return {
                ...state,
                status: "ONLINE",
                error: null,
            }
        case WS_CONNECTION_CLOSE: 
            return {
                ...state,
                status: "OFFLINE",
                error: null
            }
        case WS_CONNECTION_ERROR: 
            return {
                ...state,
                error: action.payload,
            }
        
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: null,
                orders: action.payload.orders!,
                total: action.payload.total!,
                totalToday: action.payload.totalToday!
            };
        default:
            return state;
    }
}