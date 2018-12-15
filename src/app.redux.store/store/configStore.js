import { createBrowserHistory, createMemoryHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducer/rootReducer";
const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);
export const history = isServer
  ? createMemoryHistory((url = "/") => {
      return {
        initialEntries: [url]
      };
    })
  : createBrowserHistory();

// const initialState = {
//   isUserLoggedIn: false,
//   loggedUserAvatar: undefined,
//   loggedUserName: undefined
// };
const composeEnhancer = !isServer
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const store = createStore(
  createRootReducer(history), // root reducer with router state

  // initialState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  )
);
