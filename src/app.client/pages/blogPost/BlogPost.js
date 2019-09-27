import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import removeMD from "remove-markdown";

//layout
import BlogPostLayout from "./blogPostLayout/BlogPostLayout";
import NavBarLayout from "../../layouts/NavBarLayout";

//components
import LoadingLogo from "../../components/loadingLogo/LoadingLogo";
import Article from "./article/Article";
import { Ad1, Ad2 } from "./ads/ArticleAds";
import SimilPost from "./similPost/SimilPost";
import Footer from "./footer/Footer";
import Comments from "./comments/Comments";
import Popular from "./popular/Popular";

const BlogPost = ({ title, summary }) => {
  const [isLoadingLogo, setIsLoadingLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingLogo(false);
    }, 1.5 * 1000);
  }, []);

  if (isLoadingLogo) {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "100",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LoadingLogo />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="Description" content={removeMD(summary)} />
      </Helmet>

      <NavBarLayout>
        <BlogPostLayout
          article={<Article></Article>}
          ad1={<Ad1 />}
          ad2={<Footer></Footer>}
          similPost={<SimilPost asideTitle="Similar Posts" />}
          footer={<Ad2 />}
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
