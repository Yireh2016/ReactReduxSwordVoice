import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//components
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Preview from "./components/preview/preview";

class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <Switch>
        <Route exact path="/cms" render={() => <Login />} />
        <Route path="/cms/dashboard" render={() => <Dashboard />} />
        <Route
          path="/cms/preview"
          render={props => <Preview props={props} />}
        />
      </Switch>
    );
  }
}

export default App;
