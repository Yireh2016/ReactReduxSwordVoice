import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import { withCookies } from "react-cookie";
import "./app.css";
import "./index.css";

import Home from "./components/home/home.component";
import About from "./components/about/about.component";
import Blog from "./components/blog/blog.component";
import Portolio from "./components/portfolio/portfolio.component";
import Contact from "./components/contact/contact.component";
import BlogArticle from "./components/blog/blogPost/blogPost.component";

class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/home"
          render={() => <Home cookies={this.props.cookies} />}
        />
        <Route
          exact
          path="/"
          render={() => <Home cookies={this.props.cookies} />}
        />
        <Route
          exact
          path="/about"
          render={() => <About cookies={this.props.cookies} />}
        />
        <Route
          exact
          path="/blog"
          render={() => <Blog cookies={this.props.cookies} />}
        />
        <Route
          exact
          path="/portfolio"
          render={() => <Portolio cookies={this.props.cookies} />}
        />
        <Route
          exact
          path="/contact"
          render={() => <Contact cookies={this.props.cookies} />}
        />
        <Route
          strict
          path="/blog/post/"
          render={() => <BlogArticle cookies={this.props.cookies} />}
        />
      </Switch>
    );
  }
}

export default App;
