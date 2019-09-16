import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//components
import Loading from "../../../components/loading/loading";
import Post from "../../../components/post/Post";
import PostCard from "../../../components/postCard/PostCard";

//api calls
import apiCtrl from "../../../../apiCalls/generic/apiCtrl";

//services
import triggerDialog from "../../../services/triggerDialog";

//layputs
import FlexItem from "../../../layouts/FlexItem";

//assets
//assets
import {
  claps as claps2,
  comments as comments2,
  share as share2,
  views as view2
} from "../../../assets/svgIcons/SvgIcons";

const Layout = styled.div`
  overflow: hidden;
`;

const PopLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  textalign: left;
  borderradius: 5px;
  color: #f95f0b;
  background-color: #00171f;
  padding: 15px 10px;
`;

const FilterLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h5 {
    color: #00171f;
    font-family: "Work Sans", sans-serif;
  }
`;

const IconsCont = styled.div`
  margin: 0 0 0 10px;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  padding: 15px;
  :hover {
    cursor: pointer;
  }
  svg {
    fill: coral;
    width: ${props => (props.selected ? "30px" : "25px")};
    padding-bottom: 5px;
    border-bottom: ${props => (props.selected ? "3px solid coral" : "none")};
    transition: all ease 500ms;
  }
`;

const AsidePostsCont = styled.div`
  display: flex;
  width: ${props => props.popWidth + "px"};
`;

const MorePostsCont = styled.div`
  display: flex;
  justify-content: center;
`;

const MorePosts = styled.div`
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: ${props => (props.noPadding ? "0" : "15px 30px 20px 15px")};
  text-align: center;
  box-sizing: border-box;
  background: #00171f;
  color: #00171f;
  color: coral;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

const PostsLay = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
`;

const LoadingCont = styled.div`
  height: ${props => props.postsLayH + 1 + "px"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Popular = ({ blog, setFilter, setPopularArr, device }) => {
  //state Managment
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isLoadingPopularPosts, setIsLoadingPopularPosts] = useState(false);
  const [popWidth, setPopWidth] = useState(0);

  const [postsLayH, setPostsLayH] = useState(251);
  const postsLayRef = React.createRef();

  useEffect(() => {
    switch (device) {
      case "pc": {
        const PostWidth = ((window.outerWidth * 8) / 12) * 0.3;

        setPopWidth(PostWidth * blog.popularArticlesArr.length);

        break;
      }

      case "tablet": {
        const PostWidth = ((window.outerWidth * 12) / 12) * 0.35;

        setPopWidth(PostWidth * blog.popularArticlesArr.length);

        break;
      }

      default: {
        const PostWidth = ((window.outerWidth * 12) / 12) * 0.8;

        setPopWidth(PostWidth * blog.popularArticlesArr.length);

        break;
      }
    }
  }, [device]);

  useEffect(() => {
    console.log(
      "postsLayRef.current.clientHeight",
      postsLayRef.current.clientHeight
    );

    postsLayRef.current && setPostsLayH(postsLayRef.current.clientHeight);
  }, [postsLayH]);

  // Event Handlers
  const onFilterIconClick = async filter => {
    const lastFilter = blog.popularFilter;

    switch (filter) {
      case "views":
        setFilter({
          views: true,
          shares: false,
          comments: false,
          claps: false
        });
        break;
      case "claps":
        setFilter({
          claps: true,
          views: false,
          shares: false,
          comments: false
        });
        break;
      case "shares":
        setFilter({
          shares: true,
          views: false,
          comments: false,
          claps: false
        });
        break;
      case "comments":
        setFilter({
          comments: true,
          shares: false,
          views: false,
          claps: false
        });

        break;

      default:
        setFilter({
          views: true,
          shares: false,
          comments: false,
          claps: false
        });
        break;
    }

    setIsFilterLoading(true);

    apiCtrl(
      {
        url: "api/filterPopular",
        data: {
          filter,
          popularTotalCount: blog.articlesCount,
          popularCount: 0
        },
        method: "put"
      },
      res => {
        if (res.data.status === "OK") {
          setIsFilterLoading(false);
          setPopularArr([...res.data.popularArr]);
          return;
        }

        console.log("Error changing filter", res.data.status);
        setFilter(lastFilter);
        setIsFilterLoading(false);
      },
      err => {
        console.log("Error changing filter err", err);
        const message = err.response.data.message;
        triggerDialog({
          title: "Error 🤬",
          body: `There was a error : ${message}. Please, try again later`
        });
        setIsFilterLoading(false);
        setFilter(lastFilter);
      }
    );
  };

  const MorePopularPostsHandler = async () => {
    setIsLoadingPopularPosts(true);

    let filter;
    const filterObj = blog.popularFilter;

    Object.keys(filterObj).forEach(key => {
      let value = filterObj[key];

      if (value === true) {
        filter = key;
        return;
      }
    });

    apiCtrl(
      {
        url: "api/filterPopular",
        data: {
          filter,
          popularTotalCount: blog.articlesCount,
          popularCount: blog.popularArticlesArr.length
        },
        method: "put"
      },
      res => {
        if (res.data.status === "OK") {
          setPopularArr([...blog.popularArticlesArr, ...res.data.popularArr]);
          setIsFilterLoading(false);
          return;
        }

        console.log("Error searching filter", res.data.status);
        triggerDialog({
          title: "Error 🤬",
          body: `There was a error : ${res.data.message}. Please, try again later`
        });
        setIsFilterLoading(false);
      },
      err => {
        console.log("Error changing filter err", err);
        console.log("navbar logoutclickhandler  Err", err);
        const message = err.response.data.message;
        triggerDialog({
          title: "Error 🤬",
          body: `There was a error : ${message}. Please, try again later`
        });
        setIsFilterLoading(false);
      }
    );
  };

  //redering variables
  let { popularArticlesArr } = blog;

  let popPostsArray;

  if (popularArticlesArr.length === 0) {
    popularArticlesArr = [
      {
        title: "",
        postImg: "",
        postGradient: "",
        keywords: [],
        author: "",
        date: "",
        url: "",
        avatar: "",
        summaryTextHtml: ""
      }
    ];
    popPostsArray = [];
  } else {
    if (blog.articlesCount > popularArticlesArr.length) {
      popPostsArray = [...popularArticlesArr, { moreBtn: "exist" }];
    } else {
      popPostsArray = [...popularArticlesArr];
    }
  }

  const asidePosts =
    popPostsArray.length > 0
      ? popPostsArray.map((post, i) => {
          // const arrLen = arr.length;
          const {
            title,
            keywords,
            author,
            date,
            url,
            summaryTextHtml,
            postImg,
            postGradient
          } = post;

          let avatar;

          avatar = post.avatar;
          const size = 4;

          if (post.moreBtn && post.moreBtn === "exist") {
            return (
              <FlexItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                key={i}
                size={size}
              >
                <MorePostsCont>
                  <MorePosts
                    onClick={MorePopularPostsHandler}
                    id="MorePopularPosts"
                    noPadding={showLoading}
                  >
                    {showLoading ? <Loading /> : "More..."}
                  </MorePosts>
                </MorePostsCont>
              </FlexItem>
            );
          }
          const showLoading = isLoadingPopularPosts;
          console.log(`PopPostCard${i}`); //TODO rm
          return (
            <FlexItem key={i}>
              <PostCard
                id={`PopPostCard${i}`}
                postH={popWidth / (blog.popularArticlesArr.length * 1.028)}
                hasSummary={true}
                title={title}
                postImg={postImg}
                postGradient={postGradient}
                keywords={keywords}
                author={author}
                date={date}
                url={`/blog/post/${url}`}
                avatar={avatar}
                summaryTextHtml={summaryTextHtml}
              />
            </FlexItem>
          );
        })
      : null;

  return (
    <Layout id="asideLayout">
      <section>
        <PopLayout>
          <Title>Popular Posts</Title>

          <FilterLayout>
            <h5>Filter</h5>
            <IconsCont>
              <Icon
                onClick={() => {
                  onFilterIconClick("views");
                }}
                selected={blog.popularFilter.views}
              >
                {view2}
              </Icon>
              <Icon
                onClick={() => {
                  onFilterIconClick("claps");
                }}
                selected={blog.popularFilter.claps}
              >
                {claps2}
              </Icon>
              <Icon
                onClick={() => {
                  onFilterIconClick("shares");
                }}
                selected={blog.popularFilter.shares}
              >
                {share2}
              </Icon>
              <Icon
                onClick={() => {
                  onFilterIconClick("comments");
                }}
                selected={blog.popularFilter.comments}
              >
                {comments2}
              </Icon>
            </IconsCont>
          </FilterLayout>

          {isFilterLoading ? (
            <LoadingCont postsLayH={postsLayH}>
              <Loading />
            </LoadingCont>
          ) : (
            <PostsLay ref={postsLayRef}>
              <AsidePostsCont popWidth={popWidth} id="postsContainer">
                {asidePosts}
              </AsidePostsCont>
            </PostsLay>
          )}
        </PopLayout>
      </section>
    </Layout>
  );
};

const mapStateToProps2 = state => {
  return {
    blog: state.blog,
    device: state.resize.device
  };
};

const mapDispachToProps = dispatch => {
  return {
    //acciones
    setPopularArr: arr => dispatch({ type: "SET_POPULAR_ARR", payload: arr }),
    setFilter: filter =>
      dispatch({ type: "SET_POPULAR_FILTER", payload: filter })
  };
};

export default connect(
  mapStateToProps2,
  mapDispachToProps
)(Popular);
