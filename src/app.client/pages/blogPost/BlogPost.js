import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

//lsyout
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

const BlogPost = ({ title, summary, url, categories, date, avatar }) => {
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

  const keywordsMeta = categories.map((category, i) => {
    return <meta key={i} property="article:tag" content={category}></meta>;
  });

  const newDate = date.replace("th", "");

  let dateMeta = newDate.match(/\w+(\s)/)[0] + "," + newDate.match(/\d,.*/);

  dateMeta = new Date(dateMeta);

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="Description" content={summary} />

        <link
          rel="canonical"
          href={`${process.env.WEB_URL}/blog/post/${url}`}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta
          property="og:url"
          content={`${process.env.WEB_URL}/blog/post/${url}`}
        />
        <meta property="og:site_name" content="SwordVoice.com" />
        {keywordsMeta}
        <meta
          property="article:published_time"
          content={dateMeta.toISOString()}
        />
        <meta property="og:image" content={avatar} />
        <meta property="og:image:secure_url" content={avatar} />
        <meta property="og:image:width" content="486" />
        <meta property="og:image:height" content="500" />
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
  const { title, summary, url, categories, date, avatar } = state.article;
  return { title, summary, url, categories, date, avatar };
};

const mapActionsToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(BlogPost);
