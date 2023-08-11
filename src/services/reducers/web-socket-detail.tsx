import {
    SET_IS_REQUEST,
    SET_IS_FAILED,
    SET_DETAIL,
    REMOVE_DETAIL
} from '../actions/web-socket-detail';

import type { TWSDActions } from '../actions/web-socket-detail';
import type { TOrder } from '../../utils/types';

type TWSDState = {
    data: TOrder | null;
    isRequest: boolean;
    isFailed: boolean;
}

const initialState: TWSDState = {
    data: null,
    isRequest: false,
    isFailed: false,
}

export const wsdReducer = (state = initialState, action: TWSDActions): TWSDState => {
    switch (action.type) {
        case SET_IS_REQUEST: {
            return {
                ...state,
                isRequest: true,
                isFailed: false,
            }
        }
        case SET_IS_FAILED: {
            return {
                ...state,
                isRequest: false,
                isFailed: true
            }
        }
        case SET_DETAIL: {
            return {
                ...state,
                data: action.payload,
                isRequest: false,
                isFailed: false,
            }
        }
        case REMOVE_DETAIL: {
            return {
                ...state,
                data: null
            }
        }
        default: {
            return state;
        }
    }
}