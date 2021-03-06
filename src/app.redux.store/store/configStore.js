import {createBrowserHistory, createMemoryHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import is from 'is_js'

// import { composeWithDevTools } from "remote-redux-devtools";
//reducers
import createRootReducer from './reducer/rootReducer'
const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
export const history = isServer
  ? createMemoryHistory((url = '/') => {
      return {
        initialEntries: [url]
      }
    })
  : createBrowserHistory()

//Estado inicial viene de la variable preloaded_state que esta definida en el servidor SERVER.INDEX.JS
const initialState = isServer ? undefined : window.__PRELOADED_STATE__

//habilito el redux dev tool solo para chrome
const composeEnhancer =
  !isServer && is.chrome() && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export const store = createStore(
  createRootReducer(history), // root reducer with router state

  initialState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  )
)
