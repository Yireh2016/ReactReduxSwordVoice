import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import "./app.css";
import "./index.css";

import Home from "./components/home/home.component";
import About from "./components/about/about.component";
import Blog from "./components/blog/blog.component";
import Portolio from "./components/portfolio/portfolio.component";
import Contact from "./components/contact/contact.component";
import BlogArticle from "./components/blog/blogPost/blogPost.component";

import Test from "./components/test";

// export default class App extends Component {
//   render() {
//     // const { isMobile } = this.props;

//     return <BlogArticle />;
//   }
// }

export default class App extends Component {
  render() {
    // const { isMobile } = this.props;

    return (
      <Switch>
        <Route exact path="/home" component={Home} />{" "}
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/portfolio" component={Portolio} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/blog/post" component={BlogArticle} />
      </Switch>
    );
  }
}
