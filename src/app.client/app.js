import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Helmet from "react-helmet";
import "./app.css";
import "./index.css";
import favicon from "../assets/favicon2-16x16.png";

//pages

import NoLandscape from "./layouts/NoLandscape";
//pages
import ContactUs from "./pages/contactUs/ContactUs";

//lazyLoad code Splitting

const Home = loadable(() => import("./components/home/home.component"));
const About = loadable(() => import("./components/about/about.component"));

const BlogArticle = loadable(() => import("./pages/blogPost/BlogPost"));

const BlogPage = loadable(() => import("./pages/blog/BlogPage"));

const PasswdRecoveryForm = loadable(() =>
  import("./pages/passwdRecovery/PasswdRecovery")
);

// const ContactUs = loadable(() => import("./pages/contactUs/ContactUs"));

const Courses = loadable(() => import("./pages/courses/Courses"));
const Portolio = loadable(() =>
  import("./components/portfolio/portfolio.component")
);
const NotFound = loadable(() => import("./components/notFound/notFound2"));

class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <NoLandscape>
        <Helmet>
          <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
        </Helmet>
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
          <Route
            exact
            path="/passwdRecoveryForm"
            render={() => <PasswdRecoveryForm cookies={this.props.cookies} />}
          />
          {/* <Route
          exact
          path="/newBlog"
          render={() => <BlogPage cookies={this.props.cookies} />}
        /> */}
          <Route strict path="/blog/post/" render={() => <BlogArticle />} />
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
