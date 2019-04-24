import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import Radium from "radium";
import { connect } from "react-redux";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
// import axios from "axios";
//assets
import blogBackground from "../../assets/img/blog/fondoBlog.jpg"; //'src\app.client\assets\img\blog\fondoBlog.jpg'
import "./blog.css";

//layouts

//components
// import Summary from "../../components/blog/common/summary/summary2.component";
import SummaryCard from "./postCard/summaryCard/SummaryCard";
import TwoColumnAside from "../../layouts/TwoColumnAside";
import Logo from "../../components/general/logo.component";
import Call2Action from "../../components/general/call2action.component";
import FooterApp from "../../components/footer/footer.component";
import SearchBar from "../../components/blog/searchBar/searchBar.component";
import ScrollMouse from "../../components/scrollMouse/ScrollMouse";
import Loading from "../../components/loading/loading";

//services
import isDevice from "../../../services/isDevice";
// import dbDateToNormalDate from "../../../services/dbDateToNormalDate";
import PostCard from "./postCard/PostCard";
// import paragraphService from "../../../services/paragraphService";
// import keywordsToArr from "../../../services/keywordsToArr";

const navBarHeight = "93px";
const headerRadius = 140;

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
        justifyContent: "center"
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
      textAlign: "center",
      color: "#f95f0b",
      position: "sticky",
      top: "0",
      zIndex: "4",
      backgroundColor: "#00171f",
      padding: "10px",
      "@media (max-width: 1050px)": {
        textAlign: "left",
        position: "sticky",
        left: "0"
      }
    },
    layout: {
      backgroundColor: "#00171f",
      margin: "5vmin 0",
      borderRadius: "8px",
      height: "calc(100vh - 15vmin - 112px)",
      "@media (max-width: 1050px)": {
        height: "auto"
      }
    }
  },
  headerPostLayout: {
    "@media (max-width: 1050px)": {
      width: "auto",
      flexDirection: "column"
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
    height: "calc(100vh - 10vmin)",
    "@media (max-width: 1050px)": {
      height: "auto"
    }
  }
};

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeviceResult: "pc",
      isLoading: true, // true,
      mainPostH: 0,
      searchBorder: " 1px transparent solid",
      searchTranslateX: "70%",
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
        postH = window.outerWidth / 1.028 - 24;
        break;

      default:
        break;
    }

    this.setState({ mainPostH: postH });
  };

  componentDidMount() {
    window.addEventListener("resize", this.setPostDimensions);
    const isDeviceResult = isDevice();
    let postH;

    switch (isDeviceResult) {
      case "pc":
        postH = 520;
        break;
      case "tablet":
        postH = (window.outerWidth * 0.8) / 1.028;
        break;

      case "phone":
        postH = window.outerWidth / 1.028 - 24;
        break;

      default:
        break;
    }

    this.setState({
      isDeviceResult: isDeviceResult,
      isLoading: false,
      mainPostH: postH,
      searchBorder:
        isDeviceResult === "phone"
          ? "1px #0387b7 solid"
          : "1px transparent solid",
      searchTranslateX: isDeviceResult === "phone" ? "0" : "70%"
    });

    // this.setPostDimensions();
    // let data;
    // axios("/api/getPosts/")
    //   .then(res => {
    //     if (res.status === 200) {
    //       data = res.data;
    //       let newDataArr = [];

    //       for (let i = 0; i < data.length; i++) {
    //         newDataArr[i] = {
    //           postImg: data[i].postImg,
    //           postGradient: data[i].postGradient,
    //           title: data[i].title,
    //           url: data[i].url,
    //           summaryTextHtml: paragraphService(data[i].description),
    //           author: data[i].author,
    //           date: data[i].date,
    //           avatar: data[i].authorAvatar,
    //           keywords: keywordsToArr(data[i].keywords)
    //         };
    //       }

    //       const recentDataArray = newDataArr.slice(1);
    //       const popDataArray = newDataArr.slice(1);
    //       const newPostArr = newDataArr.slice(0, 1);
    //       console.log("newDataArr", newDataArr);
    //       console.log("recentDataArray", recentDataArray);
    //       console.log("popDataArray", popDataArray);

    //       this.setState({
    //         recentPostsArray: recentDataArray,
    //         popPostsArray: popDataArray,
    //         newPostArray: newPostArr,
    //         isDeviceResult: isDeviceResult,
    //         isLoading: false,
    //         mainPostH: postH,
    //         searchBorder:
    //           isDeviceResult === "phone"
    //             ? "1px #0387b7 solid"
    //             : "1px transparent solid",
    //         searchTranslateX: isDeviceResult === "phone" ? "0" : "70%"
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log("error ", err);
    //   });
  }

  handleSearchBarFocus = () => {
    if (this.state.isDeviceResult !== "phone") {
      this.state.searchTranslateX === "0"
        ? this.setState({
            searchBorder: " 1px transparent solid",
            searchTranslateX: "70%"
          })
        : this.setState({
            searchBorder: "1px #0387b7 solid",
            searchTranslateX: "0"
          });
    }
  };
  render() {
    const {
      mainPostH,
      // popPostsArray,
      // recentPostsArray,
      // newPostArray,
      searchBorder,
      searchTranslateX
    } = this.state;
    const { articlesArr } = this.props.blog;

    const recentPostsArray = articlesArr.slice(1);
    const popPostsArray = articlesArr.slice(1);
    const newPostArray = articlesArr.slice(0, 1);

    if (process.env.SERVER) {
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
                estilos="appear footer-blog "
                size="redesSociales-blog"
              />
            </React.Fragment>
          )}
        </div>
      </footer>
    );
    const asidePosts = popPostsArray.map((post, i) => {
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
      if (typeof post.avatar === "object") {
        avatar = JSON.stringify(post.avatar);
      } else if (typeof post.avatar === "string") {
        avatar = post.avatar;
      }

      const isDeviceResult = isDevice();
      let asidePostH;
      if (isDeviceResult === "phone") {
        asidePostH = parseInt(mainPostH) * 0.8;
      } else {
        asidePostH = parseInt(mainPostH) * 0.55;
      }

      return (
        <PostCard
          key={i}
          postH={asidePostH}
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
      );
    });
    const aside = (
      <React.Fragment>
        <div className="nolandscape">
          <span>This site is not landscape friendly</span>
          <span>Please, turn your device to portrait position. Thanks </span>
        </div>
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
                data-simplebar
                style={[styles.aside.layout, styles.layout.flexColumn]}
              >
                <h3 style={styles.aside.title}>Popular Posts</h3>
                <div id="postsContainer" style={styles.aside.postsContainer}>
                  {asidePosts}
                </div>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );

    const postCards = recentPostsArray.map((post, i) => {
      const {
        title,
        postImg,
        postGradient,
        keywords,
        author,
        date,
        url,
        summaryTextHtml
      } = post;

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

    const { isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              zIndex: "100",
              backgroundColor: "white"
            }}
          >
            <Loading />
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
              <PostCard
                title={newPostArray[0].title}
                postH={mainPostH}
                postImg={newPostArray[0].postImg}
                postGradient={newPostArray[0].postGradient}
                url={`/blog/post/${newPostArray[0].url}`}
              />
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
              <PostCard
                title={newPostArray[0].title}
                postH={mainPostH}
                postImg={newPostArray[0].postImg}
                postGradient={newPostArray[0].postGradient}
                hasSummary={true}
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
              />
            </div>

            <div
              style={[
                { display: "none", position: "absolute" },
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
                searchBorder={searchBorder}
                searchTranslateX={searchTranslateX}
                onFocus={this.handleSearchBarFocus}
                onBlur={this.handleSearchBarFocus}
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
              {postCards}
            </div>
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
const mapDispachToProps = dispach => {
  return {
    //acciones
  };
};

const BlogPage2 = Radium(BlogPage);

export default connect(
  mapStateToProps2,
  mapDispachToProps
)(BlogPage2);
