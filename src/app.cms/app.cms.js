import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//components
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";

class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <Switch>
        <Route exact path="/cms" render={() => <Login />} />
        <Route exact path="/cms/dashboard" render={() => <Dashboard />} />
      </Switch>
    );
  }
}

export default App;
