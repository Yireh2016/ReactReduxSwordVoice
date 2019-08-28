import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

//lsyout
import BlogPostLayout from "./blogPostLayout/BlogPostLayout";
import NavBarLayout from "../../layouts/NavBarLayout";

//components
import Article from "./article/Article";
import { Ad1, Ad2 } from "./ads/ArticleAds";
import SimilPost from "./similPost/SimilPost";
import Footer from "./footer/Footer";
import Comments from "./comments/Comments";
import Popular from "./popular/Popular";

const BlogPost = ({ title, summary }) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="Description" content={summary} />
      </Helmet>

      <NavBarLayout>
        <BlogPostLayout
          article={<Article></Article>}
          ad1={<Ad1 />}
          ad2={<Ad2 />}
          similPost={<SimilPost asideTitle="Similar Posts" />}
          footer={<Footer></Footer>}
          comments={<Comments></Comments>}
          popPosts={<Popular></Popular>}
        />
      </NavBarLayout>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { title, summary } = state.article;
  return { title, summary };
};

const mapActionsToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(BlogPost);
