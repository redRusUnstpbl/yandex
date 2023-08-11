import { Middleware } from "redux"
import { 
  CONNECT, 
  DISCONNECT, 
  WS_CONNECTING, 
  TWSActions, 
  TWSData 
} from '../actions/web-socket';

import { 
  wsConnect as wsConnectAction,
  wsDisconnect as wsDisconnectAction,
  wsConnecting as wsConnectingAction,
  wsOpen as onOpenAction,
  wsClose as onCloseAction,
  wsError as onErrorAction,
  wsMessage as onMessageAction
} from '../actions/web-socket';

export type TwsActionsTypes = {
  wsConnect: typeof wsConnectAction,
  wsDisconnect: typeof wsDisconnectAction,
  wsConnecting: typeof wsConnectingAction,
  onOpen: typeof onOpenAction,
  onClose: typeof onCloseAction,
  onError: typeof onErrorAction,
  onMessage: typeof onMessageAction,
}

export const socketMiddleware = (wsActions: TwsActionsTypes): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, wsDisconnect, wsConnecting, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === CONNECT) {
        // console.log('Websocket connecting')
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }


      if (socket && type === WS_CONNECTING) {
        socket.onopen = () => {
          // console.log('open');
          dispatch(onOpen());
        }

        socket.onerror = (event: Event) => {
          // console.log('error', event);
          dispatch(onError(`Error`));
        }

        socket.onmessage = (event: MessageEvent) => {
          const {data} = event;
          const parsedData: TWSData = JSON.parse(data);
          if (parsedData.orders) {
            parsedData.orders = parsedData.orders.sort((a, b) => b.number - a.number)
          }
          dispatch(onMessage(parsedData));
        }

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            console.log('error', event.code.toString());
            dispatch(onError(`Error: ${event.code.toString()}`));
          }

          // console.log('close');
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting())
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 10000)
          }
        }
      }

      if (socket && type === DISCONNECT) {
        // console.log('disconnect');
        window.clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        dispatch(wsDisconnect());
        socket.close();
      }

      next(action)
    }
  }
}