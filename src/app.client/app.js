import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
// import { withCookies } from "react-cookie";
import "./app.css";
import "./index.css";

//pages

// import Home from "./components/home/home.component";
// import About from "./components/about/about.component";
// import Portolio from "./components/portfolio/portfolio.component";
// import BlogArticle from "./components/blog/blogPost/blogPost.component";
// import NotFound from "./components/notFound/notFound2";
// import BlogPage from "./pages/blog/BlogPage";
// import Courses from "./pages/courses/Courses";
// components
import NoLandscape from "./layouts/NoLandscape";
//pages
import ContactUs from "./pages/contactUs/ContactUs";

//lazyLoad code Splitting

const Home = loadable(() => import("./components/home/home.component"));
const About = loadable(() => import("./components/about/about.component"));
const BlogArticle = loadable(() =>
  import("./components/blog/blogPost/blogPost.component")
);
const BlogPage = loadable(() => import("./pages/blog/BlogPage"));
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
