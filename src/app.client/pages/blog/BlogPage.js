import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import Radium from "radium";
import { connect } from "react-redux";
import styled from "styled-components";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import Helmet from "react-helmet";

//assets
import blogBackground from "../../assets/img/blog/fondoBlog.jpg"; //'src\app.client\assets\img\blog\fondoBlog.jpg'

//assets
import {
  claps as claps2,
  comments as comments2,
  share as share2,
  views as view2
} from "../../assets/svgIcons/SvgIcons";

import "./blog.css";

//layouts
import FlexItem from "../../layouts/FlexItem";

//components
import AdvancedSearch from "../../components/advancedSearch/AdvancedSearch";
import SummaryCard from "./postCard/summaryCard/SummaryCard";
import TwoColumnAside from "../../layouts/TwoColumnAside";
import Logo from "../../components/general/logo.component";
import Call2Action from "../../components/general/call2action.component";
import FooterApp from "../../components/footer/footer.component";
import SearchBar from "../../components/blog/searchBar/searchBar.component";
import ScrollMouse from "../../components/scrollMouse/ScrollMouse";
import LoadingLogo from "../../components/loadingLogo/LoadingLogo";
import PostCard from "./postCard/PostCard";
import Post from "./post/Post";
import Loading from "../../components/loading/loading";
import Modal from "../../components/modal/modal";

//services
import isDevice from "../../../services/isDevice";
import NewPostLayout from "./newPostLayout/NewPostLayout";
//apiCalls
import getMorePosts from "../../../apiCalls/getMorePosts";
import filterPopular from "../../apiCalls/filterPopular";
import searchArticle from "../../apiCalls/searchArticle";
import searchLastArticles from "../../apiCalls/searchLastArticles";
import advancedSearchDb from "../../apiCalls/advancedSearchDb";

const navBarHeight = "93px";
const headerRadius = 140;

const MorePostsCont = styled.div`
  display: flex;
  justify-content: center;
`;
const MorePosts = styled.div`
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin: 0 0 40px 0;
  padding: ${props => (props.noPadding ? "0" : "15px 30px 20px 15px")};
  text-align: center;
  box-sizing: border-box;
  width: 50%;
  background: #00171f;
  color: #00171f;
  color: coral;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

const styles = {
  tablet: {
    "@media (max-width: 150px)": {
      display: "none"
    }
  },
  layout: {
    flex: { display: "flex" },
    flexRight: {
      justifyContent: "flex-end"
    },
    flexCenter: {
      justifyContent: "center"
    },
    fullCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    fullContainerHeight: { height: "100%" },
    fullContainerWidth: { width: "100%" },
    halfContainerWidth: {
      width: "50%"
    },
    flexRow: { flexDirection: "row" },
    flexColumn: { flexDirection: "column" }
  },
  header: {
    container: {
      borderTop: "3px solid #F95F0B",
      borderLeft: "3px solid #F95F0B",
      borderRight: "3px solid #F95F0B",
      borderBottom: "none",
      backgroundSize: "cover",
      backgroundPositionY: "center",
      backgroundPositionX: "center",
      boxSizing: "border-box",
      "@media (max-width: 1050px)": {
        marginTop: "14vw",
        height: `calc(100vh - 14vw)`,
        alignItems: "center",
        justifyContent: "center",
        display: "block"
      },
      "@media (max-width: 700px)": {
        marginTop: "21.4vw",
        height: `calc(100vh - 21.4vw)`,
        borderRadius: ` 0px ${headerRadius / 2}px 0px 0px`
      }
    }
  },
  footer: {
    layout: {
      "@media (max-width: 1050px)": {
        display: "none"
      }
    }
  },
  aside: {
    postsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "@media (max-width: 1050px)": {
        flexDirection: "row"
      }
    },
    title: {
      borderRadius: "5px",
      textAlign: "center",
      color: "#f95f0b",
      position: "sticky",
      top: "0",
      zIndex: "4",
      backgroundColor: "#00171f",
      padding: "15px 10px",
      "@media (max-width: 1050px)": {
        textAlign: "left",
        position: "sticky",
        left: "0"
      }
    },
    layout: {
      margin: "5vmin 0",
      borderRadius: "8px",
      height: "calc(100vh - 20vmin - 112px)",
      "@media (max-width: 1050px)": {
        height: "auto",
        margin: "0",
        borderRadius: "0"
      }
    }
  },
  headerPostLayout: {
    "@media (max-width: 1050px)": {
      width: "auto",
      display: "block"
    }
  },
  headerSummaryLayout: {
    "@media (max-width: 1050px)": {
      display: "none"
    }
  },
  recentPostTitleContainer: {
    display: "flex",
    position: "sticky",
    top: "0",
    backgroundColor: "white",
    zIndex: "4",
    justifyContent: "space-around",
    padding: "15px 0 0 0",
    "@media (max-width: 1050px)": {
      position: "relative"
    },
    "@media (max-width: 700px)": {
      flexDirection: "column"
    },
    title: {
      fontWeight: "normal",
      color: "#f95f0b"
    }
  },
  recentPostLayout: {
    padding: "2.5vmin",
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    "@media (max-width:1050px)": {
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      overflow: "scroll",
      width: "100vw",
      justifyContent: "flex-start"
    }
  },
  popularPostLayout: {
    overflow: "hidden",
    height: "calc(100vh - 7vmin)",
    "@media (max-width: 1050px)": {
      height: "auto"
    }
  }
};

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
  flex-direction: column;
  align-items: center;
  white-space: normal;
  overflow-x: hidden;
  height: calc(100% - 100px);
  > div {
    margin-bottom: 40px;
  }

  @media (max-width: 1050px) {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0 0 15px 0;

    height: calc(100% - 100px);
    flex-direction: row;
    > div {
      margin-right: 20px;
    }
    > div:nth-child(1) {
      margin: 0 20px 40px 20px;
    }
  }
`;

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeviceResult: "pc",
      isLoading: true, // true,
      isLoadingPosts: false, // true,
      isFilterLoading: false,
      isAdvancedSearch: false,
      isLoadingPopularPosts: false,
      mainPostH: 0,
      lastPostW: 0,
      searchTranslateX: "70%",
      searchValue: "",
      recentPostsArray: [
        {
          postImg: ``,
          title: "",
          url: "",
          summaryTextHtml: " ",
          author: "",
          date: "",
          avatar: "",
          keywords: [""]
        }
      ],
      popPostsArray: [
        {
          postImg: ``,
          title: "",
          url: "",
          summaryTextHtml: " ",
          author: "",
          date: "",
          avatar: "",
          keywords: [""]
        }
      ],
      newPostArray: [
        {
          postImg: ``,
          title: "",
          url: "",
          summaryTextHtml: " ",
          author: "",
          date: "",
          avatar: "",
          keywords: [""]
        }
      ]
    };
  }

  setPostDimensions = () => {
    const isDeviceResult = isDevice();
    let postH;
    let asidePostW = 9;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    switch (isDeviceResult) {
      case "pc":
        asidePostW = 10;
        postH =
          (windowWidth * 0.4) / 1.028 >= 520
            ? 520
            : (windowWidth * 0.4) / 1.028;
        break;
      case "tablet":
        asidePostW = 6;
        postH = (windowWidth * 0.8) / 1.028;
        break;

      case "phone":
        postH = (windowWidth * 0.95) / 1.028;
        break;

      default:
        break;
    }

    let lastPostW = isDeviceResult === "tablet" ? 10 : 12;

    this.setState({
      mainPostH: postH,
      asidePostW,
      lastPostW: windowHeight > windowWidth * 1.3 ? lastPostW : 5
    });
  };

  componentDidMount() {
    console.log("blogpage did mount");
    this.setPostDimensions();
    window.addEventListener("resize", () => {
      console.log("resizing", navigator.userAgent);
      this.setPostDimensions();
    });
    const isDeviceResult = isDevice();
    let postH;

    switch (isDeviceResult) {
      case "pc":
        postH =
          (window.outerWidth * 0.4) / 1.028 >= 520
            ? 520
            : (window.outerWidth * 0.4) / 1.028;
        break;
      case "tablet":
        postH = (window.outerWidth * 0.8) / 1.028;
        break;

      case "phone":
        postH = (window.outerWidth * 0.95) / 1.028 - 24;
        break;

      default:
        break;
    }

    setTimeout(() => {
      this.setState({
        isDeviceResult: isDeviceResult,
        isLoading: false,
        mainPostH: postH
      });
    }, 3 * 1000);
  }

  MorePostsHandler = async () => {
    console.log("click more posts");

    this.setState({ isLoadingPosts: true });
    const getMorePostsRes = await getMorePosts(
      this.props.blog.articlesCount,
      this.props.blog.articlesArr.length
    );

    console.log("getMorePostsRes", getMorePostsRes);
    if (getMorePostsRes.status === "OK") {
      let articlesArr = [...articlesArr, ...getMorePostsRes.articles];
      this.props.setArticlesArr(articlesArr);
    }
    this.setState({ isLoadingPosts: false });
  };

  onFilterIconClick = async filter => {
    const lastFilter = this.props.blog.popularFilter;

    switch (filter) {
      case "views":
        this.props.setFilter({
          views: true,
          shares: false,
          comments: false,
          claps: false
        });
        break;
      case "claps":
        this.props.setFilter({
          claps: true,
          views: false,
          shares: false,
          comments: false
        });
        break;
      case "shares":
        this.props.setFilter({
          shares: true,
          views: false,
          comments: false,
          claps: false
        });
        break;
      case "comments":
        this.props.setFilter({
          comments: true,
          shares: false,
          views: false,
          claps: false
        });

        break;

      default:
        this.props.setFilter({
          views: true,
          shares: false,
          comments: false,
          claps: false
        });
        break;
    }

    this.setState({
      isFilterLoading: true
    });

    const filterPopularRes = await filterPopular(
      filter,
      this.props.blog.articlesCount,
      0
    );

    if (filterPopularRes.statusText === "OK") {
      this.setState({
        isFilterLoading: false
      });

      this.props.setPopularArr([...filterPopularRes.popularArr]);
      return;
    }
    console.log("Error changing filter", filterPopularRes.statusText);
    this.props.setFilter(lastFilter);
  };

  MorePopularPostsHandler = async () => {
    this.setState({ isLoadingPopularPosts: true });

    let filter;
    const filterObj = this.props.blog.popularFilter;

    Object.keys(filterObj).forEach(key => {
      let value = filterObj[key];

      if (value === true) {
        filter = key;
        return;
      }
    });

    const filterPopularRes = await filterPopular(
      filter,
      this.props.blog.articlesCount,
      this.props.blog.popularArticlesArr.length
    );

    if (filterPopularRes.statusText === "OK") {
      this.props.setPopularArr([
        ...this.props.blog.popularArticlesArr,
        ...filterPopularRes.popularArr
      ]);

      return;
    }
    console.log("Error searching filter", filterPopularRes.statusText);
  };

  onSearch = async value => {
    console.log("onSearch value ", value);
    const searchArticleRes = await searchArticle(value);

    if (searchArticleRes.statusText === "OK") {
      this.props.setArticlesCount(searchArticleRes.searchArr.length);
      this.props.setArticlesArr([
        this.props.blog.articlesArr[0],
        ...searchArticleRes.searchArr
      ]);
      return;
    }

    console.log("error finding articles", searchArticleRes.statusText);
  };

  onSearchBarReset = async () => {
    const searchLastArticlesRes = await searchLastArticles();

    if (searchLastArticlesRes.statusText === "OK") {
      this.props.setArticlesCount(searchLastArticlesRes.articlesTotalCount);
      this.props.setArticlesArr(searchLastArticlesRes.articlesArr);
      return;
    }

    console.log(
      "error finding last articles",
      searchLastArticlesRes.statusText
    );
  };

  onAdvancedSearchClick = () => {
    this.setState(prevState => {
      return {
        isAdvancedSearch: !prevState.isAdvancedSearch
      };
    });
  };
  advancedSearchHandler = async (author, dateFrom, dateTo) => {
    const advancedSearchDbRes = await advancedSearchDb(
      author,
      dateFrom,
      dateTo
    );

    if (advancedSearchDbRes.statusText === "OK") {
      this.props.setArticlesArr([
        this.props.blog.articlesArr[0],
        ...advancedSearchDbRes.advancedArr
      ]);

      this.props.setArticlesCount(advancedSearchDbRes.advancedCount);

      this.onAdvancedSearchClick();
      return;
    }

    console.log("error on advanced search", advancedSearchDbRes.statusText);
  };
  render() {
    const { mainPostH, searchTranslateX } = this.state;
    let { articlesArr, popularArticlesArr } = this.props.blog;
    if (articlesArr.length === 0) {
      articlesArr = [
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
    }

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
    }

    const recentPostsArray = articlesArr.slice(1);
    const popPostsArray = [...popularArticlesArr, { moreBtn: "exist" }];
    const newPostArray = articlesArr.slice(0, 1);

    const isClientSide =
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement;

    if (!isClientSide) {
      global.window = { location: { pathname: "" } }; // Temporarily define window for server-side
    }

    const footerBlog = (
      <footer className=" col-12 ">
        <div className="footerBlogContainer">
          <Logo
            className="footerBlogLogo "
            style={{ top: "100px" }}
            logoWidth="20vw"
          />

          {this.state.isDeviceResult !== "pc" && (
            <React.Fragment>
              <Call2Action className="call2ActionBlog" />
              <FooterApp
                id="blogPage2"
                estilos="appear footer-blog "
                size="redesSociales-blog"
              />
            </React.Fragment>
          )}
        </div>
      </footer>
    );

    const asidePosts = popPostsArray.map((post, i, arr) => {
      const arrLen = arr.length;
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
      const size = this.state.asidePostW;

      if (post.moreBtn && post.moreBtn === "exist") {
        return (
          <FlexItem key={i} size={size}>
            <MorePostsCont>
              <MorePosts
                onClick={this.MorePopularPostsHandler}
                id="MorePopularPosts"
                noPadding={showLoading}
              >
                {showLoading ? <Loading /> : "More..."}
              </MorePosts>
            </MorePostsCont>
          </FlexItem>
        );
      }
      const showLoading = this.state.isLoadingPopularPosts;
      return (
        <FlexItem key={i} size={size}>
          <Post
            id={i}
            size="md"
            title={title}
            backgroundURL={postImg.replace(
              `${postImg.match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]}`,
              `${postImg
                .match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]
                .replace(".", "_mobile.")}`
            )}
            postGradient={postGradient}
            keywords={keywords}
            author={author}
            date={date}
            link={`/blog/post/${url}`}
            avatar={avatar}
            summaryTextHtml={summaryTextHtml}
          />
        </FlexItem>
      );
    });

    const aside = (
      <React.Fragment>
        <section id="popularPost">{footerBlog}</section>

        <div id="asideContainer" style={{ position: "sticky", top: "5vmin" }}>
          <div id="asideLayout" style={styles.popularPostLayout}>
            <section>
              <div
                style={[
                  styles.layout.fullCenter,
                  styles.layout.flex,
                  styles.layout.flexColumn,
                  styles.footer.layout
                ]}
              >
                <Call2Action className="call2ActionBlog" />
                <FooterApp
                  estilos="appear footer-blog "
                  size="redesSociales-blog"
                />
              </div>

              <div
                // data-simplebar
                style={[styles.aside.layout, styles.layout.flexColumn]}
              >
                <h3 style={styles.aside.title}>Popular Posts</h3>

                <FilterLayout>
                  <h5>Filter</h5>
                  <IconsCont>
                    <Icon
                      onClick={() => {
                        this.onFilterIconClick("views");
                      }}
                      selected={this.props.blog.popularFilter.views}
                    >
                      {view2}
                    </Icon>
                    <Icon
                      onClick={() => {
                        this.onFilterIconClick("claps");
                      }}
                      selected={this.props.blog.popularFilter.claps}
                    >
                      {claps2}
                    </Icon>
                    <Icon
                      onClick={() => {
                        this.onFilterIconClick("shares");
                      }}
                      selected={this.props.blog.popularFilter.shares}
                    >
                      {share2}
                    </Icon>
                    <Icon
                      onClick={() => {
                        this.onFilterIconClick("comments");
                      }}
                      selected={this.props.blog.popularFilter.comments}
                    >
                      {comments2}
                    </Icon>
                  </IconsCont>
                </FilterLayout>

                {this.state.isFilterLoading ? (
                  <Loading />
                ) : (
                  <AsidePostsCont data-simplebar id="postsContainer">
                    {asidePosts}
                  </AsidePostsCont>
                )}
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );

    const recentPostCards = recentPostsArray.map((post, i) => {
      const {
        title,
        postGradient,
        keywords,
        author,
        date,
        url,
        summaryTextHtml
      } = post;

      let postImg = {
        backgroundImage: post.postImg.replace(
          `${post.postImg.match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]}`,
          `${post.postImg
            .match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]
            .replace(".", "_tablet.")}`
        ),
        "@media (max-width:700px)": {
          backgroundImage: post.postImg.replace(
            `${post.postImg.match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]}`,
            `${post.postImg
              .match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]
              .replace(".", "_mobile.")}`
          )
        }
      };

      let avatar;
      if (typeof post.avatar === "object") {
        avatar = JSON.stringify(post.avatar);
      } else if (typeof post.avatar === "string") {
        avatar = post.avatar;
      }
      return (
        <div
          key={i}
          style={{
            margin: "0 4vw 0 0"
          }}
        >
          <PostCard
            id={`${i}`}
            postH={parseInt(mainPostH) * 0.8}
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
        </div>
      );
    });

    const lastPost = newPostArray.map((post, i) => {
      let postImg = {
        backgroundImage: post.postImg,
        "@media (max-width:700px)": {
          backgroundImage: post.postImg.replace(
            `${post.postImg.match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]}`,
            `${post.postImg
              .match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]
              .replace(".", "_mobile.")}`
          )
        }
      };

      return (
        <PostCard
          key={i}
          id="latest"
          title={post.title}
          postH={mainPostH}
          postImg={postImg}
          postGradient={post.postGradient}
          url={`/blog/post/${post.url}`}
        />
      );
    });

    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <meta
            name="Description"
            content="SwordVoice's blog | Read about the latest news on Web Development, UI/UX, e-commerce, Web Design, How to tutorials nad more. Come and check it out!"
          />
        </Helmet>
        {this.state.isAdvancedSearch && (
          <Modal
            title="Advanced Search"
            modalHandler={this.onAdvancedSearchClick}
          >
            <AdvancedSearch
              onCancel={this.onAdvancedSearchClick}
              onSearch={this.advancedSearchHandler}
            />
          </Modal>
        )}
        {isLoading && (
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
        )}
        <NavBar hasBackground={true} />
        <header
          id="blogHeader"
          style={[
            styles.layout.flex,
            styles.header.container,
            {
              marginTop: `${navBarHeight}`,
              height: `calc(100vh - ${navBarHeight})`,
              borderRadius: ` 0px ${headerRadius}px 0px 0px`,
              backgroundImage: `radial-gradient(216.57px at 79.43% 71.15%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.41) 100%),url(${blogBackground})`
            }
          ]}
        >
          <section
            id="headerPostLayout"
            style={[
              styles.layout.fullCenter,
              styles.layout.flexRight,
              styles.headerPostLayout,
              { width: "50vw" }
            ]}
          >
            <div
              style={[
                { display: "block" },
                {
                  "@media (max-width: 1050px)": {
                    display: "none"
                  }
                }
              ]}
            >
              {lastPost}
            </div>

            <div
              style={[
                { display: "none" },
                {
                  "@media (max-width: 1050px)": {
                    display: "block"
                  }
                }
              ]}
            >
              <NewPostLayout size={this.state.lastPostW}>
                <Post
                  id="latest"
                  title={newPostArray[0].title}
                  backgroundURL={newPostArray[0].postImg}
                  postGradient={newPostArray[0].postGradient}
                  keywords={newPostArray[0].keywords}
                  author={newPostArray[0].author}
                  date={newPostArray[0].date}
                  link={`/blog/post/${newPostArray[0].url}`}
                  avatar={newPostArray[0].avatar}
                  summaryTextHtml={newPostArray[0].summaryTextHtml}
                />
              </NewPostLayout>
            </div>

            <div
              style={[
                {
                  display: "none",
                  position: "absolute",
                  top: "100%",
                  display: "none",
                  position: "absolute",
                  left: "50%",
                  transform: "translate( -50% , -100%)"
                },
                {
                  "@media (max-width: 1050px)": {
                    display: "block"
                  }
                }
              ]}
            >
              <ScrollMouse />
            </div>
          </section>

          <section
            id="headerSummaryLayout"
            style={[
              styles.layout.fullCenter,
              styles.headerSummaryLayout,
              { width: "50vw" }
            ]}
          >
            <div
              id="summaryContainer"
              style={[
                {
                  width: `${260}px`,
                  height: " 520px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              ]}
            >
              <SummaryCard
                cardW={260}
                cardH={260 * 1.2}
                keywords={newPostArray[0].keywords}
                author={newPostArray[0].author}
                date={newPostArray[0].date}
                url={`/blog/post/${newPostArray[0].url}`}
                avatar={
                  typeof newPostArray[0].avatar === "string"
                    ? newPostArray[0].avatar
                    : JSON.stringify(newPostArray[0].avatar)
                }
                summaryTextHtml={newPostArray[0].summaryTextHtml}
                style={{
                  borderRadius: "5px"
                }}
              />
            </div>
          </section>
        </header>
        <TwoColumnAside aside={aside}>
          <section
            id="recentPostTitleContainer"
            style={styles.recentPostTitleContainer}
          >
            <h2
              id="recentPostTitleText"
              style={styles.recentPostTitleContainer.title}
            >
              Recent Posts
            </h2>
            <div
              style={{
                display: " flex",
                padding: " 0 0 0 5vmin",
                alignItems: " center",
                color: "#f95f0b"
              }}
            >
              <SearchBar
                className="searchContainer"
                searchTranslateX={searchTranslateX}
                onSearch={this.onSearch}
                onReset={this.onSearchBarReset}
                onAdvancedClick={this.onAdvancedSearchClick}
              />
            </div>
          </section>
          <section
            id="recentPostContainer"
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div id="recentPostLayout" style={styles.recentPostLayout}>
              {recentPostCards}
            </div>

            {this.props.blog.articlesCount >
              this.props.blog.articlesArr.length && (
              <MorePostsCont>
                <MorePosts
                  onClick={this.MorePostsHandler}
                  id="MorePosts"
                  noPadding={this.state.isLoadingPosts}
                >
                  {this.state.isLoadingPosts ? <Loading /> : "More Posts..."}
                </MorePosts>
              </MorePostsCont>
            )}
          </section>
        </TwoColumnAside>
      </React.Fragment>
    );
  }
}

const mapStateToProps2 = state => {
  return {
    blog: state.blog
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones
    setArticlesArr: arr => dispatch({ type: "ARTICLES_ARR", payload: arr }),
    setArticlesCount: count =>
      dispatch({ type: "SET_ARTICLES_COUNT", payload: count }),
    setPopularArr: arr => dispatch({ type: "SET_POPULAR_ARR", payload: arr }),
    setFilter: filter =>
      dispatch({ type: "SET_POPULAR_FILTER", payload: filter })
  };
};

const BlogPage2 = Radium(BlogPage);

export default connect(
  mapStateToProps2,
  mapDispachToProps
)(BlogPage2);
