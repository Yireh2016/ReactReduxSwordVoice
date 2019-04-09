import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import Radium from "radium";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import axios from "axios";
//assets
import blogBackground from "../../assets/img/blog/fondoBlog.jpg"; //'src\app.client\assets\img\blog\fondoBlog.jpg'

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
import paragraphService from "../../../services/paragraphService";
import keywordsToArr from "../../../services/keywordsToArr";

const navBarHeight = "93px";
const headerRadius = 140;

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeviceResult: "pc",
      isLoading: true,
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
  componentDidMount() {
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

    let data;
    axios("/api/getPosts/")
      .then(res => {
        if (res.status === 200) {
          data = res.data;
          let newDataArr = [];

          for (let i = 0; i < data.length; i++) {
            newDataArr[i] = {
              postImg: `uploads/${data[i].url}/${data[i].imageURL}`,
              title: data[i].title,
              url: data[i].url,
              summaryTextHtml: paragraphService(data[i].description),
              author: data[i].author,
              date: data[i].date,
              avatar: data[i].authorAvatar,
              keywords: keywordsToArr(data[i].keywords)
            };
          }

          const recentDataArray = newDataArr.slice(1);
          const popDataArray = newDataArr.slice(1);
          const newPostArr = newDataArr.slice(0, 1);
          console.log("newDataArr", newDataArr);
          console.log("recentDataArray", recentDataArray);
          console.log("popDataArray", popDataArray);
          this.setState({
            recentPostsArray: recentDataArray,
            popPostsArray: popDataArray,
            newPostArray: newPostArr,
            isDeviceResult: isDeviceResult,
            isLoading: false,
            mainPostH: postH,
            searchBorder:
              isDeviceResult === "phone"
                ? "1px #0387b7 solid"
                : "1px transparent solid",
            searchTranslateX: isDeviceResult === "phone" ? "0" : "70%"
          });
        }
      })
      .catch(err => {
        console.log("error ", err);
      });
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
      popPostsArray,
      recentPostsArray,
      newPostArray,
      searchBorder,
      searchTranslateX
    } = this.state;

    let styles = {
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
          marginTop: `${navBarHeight}`,
          borderTop: "3px solid #F95F0B",
          borderLeft: "3px solid #F95F0B",
          borderRight: "3px solid #F95F0B",
          borderBottom: "none",
          backgroundImage: `radial-gradient(216.57px at 79.43% 71.15%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.41) 100%),url(${blogBackground})`,
          backgroundSize: "cover",
          backgroundPositionY: "center",
          backgroundPositionX: "center",
          height: `calc(100vh - ${navBarHeight})`,
          borderRadius: ` 0px ${headerRadius}px 0px 0px`,
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
        },
        post: {
          backgroundImage: newPostArray[0].postImg,
          maxHeight: "100%",
          height: `${mainPostH}px`,
          width: `${mainPostH * 1.028}px`,
          color: "white",
          position: "relative",
          borderRadius: "5px ",
          margin: "5vmin 0",
          medium: {
            height: `${mainPostH * 0.7}px`,
            width: `${mainPostH * 1.028 * 0.7}px`
          },
          small: {
            height: `${mainPostH * 0.4}px`,
            width: `${mainPostH * 1.028 * 0.4}px`,
            margin: `1.25vmin 2.5vmin`
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
      }
    };

    if (process.env.SERVER) {
      global.window = { location: { pathname: "" } }; // Temporarily define window for server-side
    }

    const footerBlog = (
      <footer className=" col-12 ">
        <div className="footerBlogContainer">
          {/* <LightShadow factor={-10}> */}

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
          {/* </LightShadow> */}
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
        avatar,
        summaryTextHtml,
        postImg
      } = post;

      return (
        <PostCard
          key={i}
          postH={parseInt(mainPostH) * 0.55}
          hasSummary={true}
          title={title}
          postImg={postImg}
          keywords={keywords}
          author={author}
          date={date}
          url={url}
          avatar={avatar}
          summaryTextHtml={summaryTextHtml}
        />
      );
    });
    const aside = (
      <React.Fragment>
        <section id="popularPost">{footerBlog}</section>
        <div
          id="popularPostContainer"
          style={{ position: "sticky", top: "5vmin" }}
        >
          <div
            style={{
              height: "calc(100vh - 10vmin)",
              "@media (max-width: 1050px)": {
                height: "auto"
              }
            }}
          >
            <section>
              <div
                style={[
                  styles.layout.fullCenter,
                  styles.layout.flex,
                  styles.layout.flexColumn,
                  {
                    "@media (max-width: 1050px)": {
                      display: "none"
                    }
                  }
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
                style={[
                  {
                    backgroundColor: "#00171f",
                    margin: "5vmin 0",
                    borderRadius: "8px",
                    height: "calc(100vh - 15vmin - 112px)",
                    "@media (max-width: 1050px)": {
                      height: "auto"
                    }
                  },
                  styles.layout.flexColumn
                ]}
              >
                <h3
                  style={{
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
                  }}
                >
                  Popular Posts
                </h3>
                <div
                  id="postsContainer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (max-width: 1050px)": {
                      flexDirection: "row"
                    }
                  }}
                >
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
        keywords,
        author,
        date,
        url,
        avatar,
        summaryTextHtml
      } = post;
      return (
        <PostCard
          key={i}
          postH={parseInt(mainPostH) * 0.8}
          hasSummary={true}
          title={title}
          postImg={postImg}
          keywords={keywords}
          author={author}
          date={date}
          url={url}
          avatar={avatar}
          summaryTextHtml={summaryTextHtml}
        />
      );
    });

    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              zIndex: "5",
              backgroundColor: "white"
            }}
          >
            <Loading />
          </div>
        )}
        <NavBar hasBackground={true} />
        <header
          id="blogHeader"
          style={[styles.layout.flex, styles.header.container]}
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
                hasSummary={true}
                keywords={newPostArray[0].keywords}
                author={newPostArray[0].author}
                date={newPostArray[0].date}
                url={newPostArray[0].url}
                avatar={newPostArray[0].avatar}
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
                url={newPostArray[0].url}
                avatar={newPostArray[0].avatar}
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
            id="recentPostTitle"
            style={{
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
              }
            }}
          >
            <h2
              id="recentPostTitleText"
              style={{
                color: "#f95f0b"
              }}
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
            <div
              style={{
                padding: "2.5vmin",
                boxSizing: "border-box",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                "@media (max-width:1050px)": {
                  flexWrap: "nowrap",
                  overflow: "scroll",
                  width: "100vw",
                  justifyContent: "flex-start"
                }
              }}
            >
              {postCards}
            </div>
          </section>
        </TwoColumnAside>
      </div>
    );
  }
}

export default Radium(BlogPage);
