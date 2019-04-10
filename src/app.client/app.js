import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import { withCookies } from "react-cookie";
import "./app.css";
import "./index.css";

import Home from "./components/home/home.component";
import About from "./components/about/about.component";
import Portolio from "./components/portfolio/portfolio.component";
import Contact from "./components/contact/contact.component";
import BlogArticle from "./components/blog/blogPost/blogPost.component";
import NotFound from "./components/notFound/NotFound";
import BlogPage from "./pages/blog/BlogPage";

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
          render={() => <BlogPage cookies={this.props.cookies} />}
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
        {/* <Route
          exact
          path="/newBlog"
          render={() => <BlogPage cookies={this.props.cookies} />}
        /> */}
        <Route
          strict
          path="/blog/post/"
          render={() => <BlogArticle cookies={this.props.cookies} />}
        />
        <Route
          path="/"
          render={() => <NotFound cookies={this.props.cookies} />}
        />
        }/>
      </Switch>
    );
  }
}

export default App;
