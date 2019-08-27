import React from "react";

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

const BlogPost = () => {
  return (
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
  );
};

export default BlogPost;
