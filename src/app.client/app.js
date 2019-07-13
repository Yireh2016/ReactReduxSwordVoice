import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import { withCookies } from "react-cookie";
import "./app.css";
import "./index.css";

import Home from "./components/home/home.component";
import About from "./components/about/about.component";
import Portolio from "./components/portfolio/portfolio.component";
import BlogArticle from "./components/blog/blogPost/blogPost.component";
import NotFound from "./components/notFound/notFound2";
import BlogPage from "./pages/blog/BlogPage";
import Courses from "./pages/courses/Courses";
// components
import NoLandscape from "./layouts/NoLandscape";
//pages
import ContactUs from "./pages/contactUs/ContactUs";

class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <NoLandscape>
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
            render={() => <ContactUs cookies={this.props.cookies} />}
          />
          <Route
            exact
            path="/courses"
            render={() => <Courses cookies={this.props.cookies} />}
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
            strict
            path="/"
            render={() => <NotFound cookies={this.props.cookies} />}
          />
          }/>
        </Switch>
      </NoLandscape>
    );
  }
}

export default App;
