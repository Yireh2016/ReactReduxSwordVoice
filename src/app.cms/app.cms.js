import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
//components
import Login from "./components/login/login";
import Preview from "./components/preview/preview";
import Loading from "./components/loading/loading";
//lazy components SPA
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));

class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <Switch>
        <Route exact path="/cms" render={() => <Login />} />
        <Route
          exact
          path="/cms/preview"
          render={props => <Preview props={props} />}
        />
        <Route
          path="/cms/*"
          render={() => (
            <Suspense fallback={<Loading fullscreen={"true"} />}>
              <Dashboard />
            </Suspense>
          )}
        />
      </Switch>
    );
  }
}

export default App;
