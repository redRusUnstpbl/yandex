import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose } from 'redux';
import { socketMiddleware } from './middleware/web-socket-middleware';
import { 
  wsConnect as wsConnectAction,
  wsDisconnect as wsDisconnectAction,
  wsConnecting as wsConnectingAction,
  wsOpen as onOpenAction,
  wsClose as onCloseAction,
  wsError as onErrorAction,
  wsMessage as onMessageAction
} from './actions/web-socket';

const wsActions = {
  wsConnect: wsConnectAction,
  wsDisconnect: wsDisconnectAction,
  wsConnecting: wsConnectingAction,
  onOpen: onOpenAction,
  onClose: onCloseAction,
  onError: onErrorAction,
  onMessage: onMessageAction
}

const wsMiddleware = socketMiddleware(wsActions);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(wsMiddleware)
);

export const store = createStore(rootReducer, enhancers);