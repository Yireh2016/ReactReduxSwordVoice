//modules
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// import { createStore } from "redux";
import { CookiesProvider } from "react-cookie";
import { ConnectedRouter } from "connected-react-router";

//reducer
// import reducer from "../app.redux.store/store/reducer";

//components
import App from "./app";
import ScrollToTop from "../app.client/components/general/scrollToTop/scrollToTop.component";
// other imports
//Store
import { store, history } from "../app.redux.store/store/configStore";

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

hydrate(
  <CookiesProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <Router history={history}> */}
        <Router>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Router>
      </ConnectedRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// hydrate(
//   <CookiesProvider>
//     <Provider store={store}>
//       {/* <Router history={history}> */}
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </CookiesProvider>,
//   document.getElementById("root")
// );
