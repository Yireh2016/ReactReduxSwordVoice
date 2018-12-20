//modules
import React, { Component } from "react";
import SimpleBar from "simplebar-react";

//components
import Navbar from "../navbar/navbar.component";
import Post from "./post/post.component";
import NewPost from "./newPost/newPost.component";
import Call2Action from "../general/call2action.component";
import FooterApp from "../footer/footer.component";
import Logo from "../general/logo.component";
// import CustomScrollBar from "../general/customScrollBar.component";
import SearchBar from "./searchBar/searchBar.component";
import AsidePost from "../blog/asidePost/asidePost.component";
import LightShadow from "../general/lightShadow/lightShadow.component";
//css
import "./blog.css";
//images
import newPostImg from "../../assets/img/blog/newPost.jpg";
import avatarImg from "../../assets/img/general/avatar.jpg";
import Summary from "./common/summary/summary.component";
// import MyScrollBar from "../general/myScrollBar/myScrollbar.component";

// if (process.env.CLIENT) {
//   global.window = {};
// }

class BlogComponent extends Component {
  constructor(props) {
    super(props);
    this.logoCursorMove = React.createRef();
    this.newPostSectionHeight = React.createRef();

    this.state = {
      searchBorder: "1px transparent solid",
      searchTranslateX: "70%",
      asidePosition: "fixed",
      asideTop: "100px",
      popPostSectionHeight: "100vh - 94px",
      popPostContWidth: null,
      popPostsArray: this.fetchData(),
      device: "",
      recentPostsArray: this.fetchData(),
      recentPostContWidth: null,
      // summaryTextHeight: null,
      newPostArray: this.fetchNewPost()
    };
  }

  componentDidMount() {
    const winWidth = window.innerWidth;
    let device;

    if (winWidth <= 700) {
      device = "phone";
    } else if (winWidth > 700 && winWidth < 1050) {
      device = "tablet";
    } else {
      device = "pc";
    }

    // const recentDataArray = this.fetchData();
    // const popDataArray = this.fetchData();
    // const newPostArray = this.fetchNewPost();

    const recentDataArray = this.state.recentPostsArray;
    const popDataArray = recentDataArray;
    const newPostArray = this.state.newPostArray;

    const win = window.innerWidth * 0.6;
    // let summaryTextHeight;
    this.setState({ device: device });
    if (device === "pc") {
      // summaryTextHeight = "25vh";
    } else if (device === "tablet") {
      // summaryTextHeight = "15vh";
    } else {
      this.setState({
        searchBorder: "1px #0387b7 solid",
        searchTranslateX: "0"
      });
      // summaryTextHeight = "25vh";
    }
    this.setState({
      popPostContWidth:
        device === "pc" ? "100%" : popDataArray.length * win + "px",
      recentPostContWidth:
        device === "pc" ? "100%" : recentDataArray.length * win + "px",
      recentPostsArray: recentDataArray,
      popPostsArray: popDataArray,
      // // summaryTextHeight: summaryTextHeight,
      newPostArray: newPostArray
    });
  }

  fetchData() {
    return [
      //halar de la base de datos los ultimos 6 registros
      {
        articleProps: {
          image: avatarImg,
          title: "Jainer Munoz, Enterprenour and Director of SwordVoice",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      },
      {
        articleProps: {
          image: newPostImg,
          title:
            "I Left My Cushy Job to Study Depression. Here’s What I Learned. The self-loathing that often strikes in adolescence can fuel our inner critics",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      },
      {
        articleProps: {
          image: newPostImg,
          title:
            "I Left My Cushy Job to Study Depression. Here’s What I Learned. The self-loathing that often strikes in adolescence can fuel our inner critics",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      },
      {
        articleProps: {
          image: newPostImg,
          title:
            "I just got a developer job at Facebook. Here’s how I prepped for my interviews.",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      },
      {
        articleProps: {
          image: newPostImg,
          title:
            "5 Lessons Learned From Writing Over 300,000 Lines of Infrastructure Code",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      },
      {
        articleProps: {
          image: newPostImg,
          title: "Magnus Carlsen Campeón del mundo de ajedrez 2018",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      },
      {
        articleProps: {
          image: newPostImg,
          title: "Magnus Carlsen Campeón del mundo de ajedrez 2018",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      }
    ];
  }

  fetchNewPost = () => {
    return [
      {
        articleProps: {
          image: newPostImg,
          title: "Magnus Carlsen Campeón del mundo de ajedrez 2018",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      }
    ];
  };

  handleSearchBarFocus = () => {
    if (this.state.device !== "phone") {
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

  seeMorePosts = newData => {
    //funcion para fetch la base de datos de nuevos post
    const mockData = this.fetchData();
    newData.push(...mockData);
    return newData;
  };

  nodeScrollControl = (e, newData) => {
    const node = e.target;
    if (this.state.device === "pc") {
      //this.seeMorePosts();
      const maxScroll = node.scrollHeight - node.clientHeight;

      if (node.scrollTop + 1 >= maxScroll) {
        newData = this.seeMorePosts(newData);
      }
    } else {
      const maxScroll = node.scrollWidth - node.clientWidth;

      if (node.scrollLeft == maxScroll) {
        newData = this.seeMorePosts(newData);
      }
    }

    return newData;
  };
  recentPostScroll = e => {
    let newData = this.state.recentPostsArray;
    newData = this.nodeScrollControl(e, newData);

    this.setState(prevState => {
      const win = window.innerWidth * 0.6;
      return {
        recentPostContWidth:
          prevState.device === "pc" ? "100%" : newData.length * win + "px",
        recentPostsArray: newData
      };
    });
  };
  popPostScroll = e => {
    let newData = this.state.popPostsArray;
    newData = this.nodeScrollControl(e, newData);

    this.setState(prevState => {
      const win = window.innerWidth * 0.6;
      return {
        popPostContWidth:
          prevState.device === "pc" ? "100%" : newData.length * win + "px",
        popPostsArray: newData
      };
    });
  };

  render() {
    const widthHeightRatio = 1.07;

    const newPost = this.state.newPostArray;

    const popularPostsArray = this.state.popPostsArray;

    const popularPostsJSX = popularPostsArray.map((popularPostsContent, i) => {
      const bindings = popularPostsContent.articleProps;
      const summaryComponent = height => {
        return (
          <Summary
            widthHeightRatio="1.640107407407407"
            summaryParagraphHeight={0.34}
            summary={bindings.summaryText}
            date={bindings.date}
            avatar={bindings.authorAvatar}
            author={bindings.author}
            categories={bindings.categories}
            summaryTextHeight={
              this.state.device === "pc" ? `${height}` : "30vh"
            }
            summaryText="summaryTextBlogPost"
            hasReadMore={true}
            hasSummaryTitle={true}
            className="summaryTextScrollPost"
          />
        );
      };
      return (
        <div key={i} className="grid popularPost-article">
          <Post
            postImage={popularPostsContent.articleProps.image}
            postTitle={popularPostsContent.articleProps.title}
            widthHeightRatio={widthHeightRatio}
            hasBorder={true}
            summaryComponent={summaryComponent}
          />
        </div>
      );
    });

    const recentPostsJSX = this.state.recentPostsArray.map(
      (recentPostContent, i) => {
        const bindings = recentPostContent.articleProps;
        const summaryComponent = height => {
          return (
            <Summary
              summaryParagraphHeight={0.8}
              widthHeightRatio="1.640107407407407"
              summary={bindings.summaryText}
              date={bindings.date}
              avatar={bindings.authorAvatar}
              author={bindings.author}
              categories={bindings.categories}
              summaryTextHeight={
                this.state.device === "pc" ? `${height}` : "30vh"
              }
              hasSummaryTitle={true}
              summaryText="summaryTextBlogPost"
              hasReadMore={true}
              className="summaryTextScrollPost"
            />
          );
        };
        return (
          <div className="grid recentPost-article " key={i}>
            <Post
              postImage={recentPostContent.articleProps.image}
              postTitle={recentPostContent.articleProps.title}
              widthHeightRatio={widthHeightRatio}
              hasBorder={false}
              summaryComponent={summaryComponent}
            />
          </div>
        );
      }
    );

    const footerBlog = (
      <footer className=" footerBlogLayoutContainer grid col-4 col-12-md">
        <div className="footerBlogContainer">
          <LightShadow factor={-10}>
            <div ref={this.logoCursorMove}>
              <Logo
                className="footerBlogLogo "
                style={{ top: "100px" }}
                logoWidth="20vw"
              />
            </div>
          </LightShadow>
          <Call2Action className="call2ActionBlog" />
          <FooterApp estilos="appear footer-blog " size="redesSociales-blog" />
        </div>
      </footer>
    );

    return (
      <div id="blogPage">
        <Navbar hasBackground="true" />
        <div className="fila contenedorMain-Blog">
          <div className=" newPostContainer">
            {this.state.device === "pc" ? (
              <NewPost offset={true} newPost={newPost} />
            ) : (
              <NewPost newPost={newPost} />
            )}

            {this.state.device === "pc" ? footerBlog : null}
            <div className="col-8 col-12-md grid">
              {/*ojito*/}
              <section
                className="recentPost "
                style={{
                  clear: "left"
                }}
              >
                <h2 className="">Recent Posts</h2>

                <SearchBar
                  className="searchContainer"
                  onFocus={this.handleSearchBarFocus}
                  onBlur={this.handleSearchBarFocus}
                  searchBorder={this.state.searchBorder}
                  searchTranslateX={this.state.searchTranslateX}
                />
              </section>

              <div
                className="recentPostLayoutContainer"
                onScroll={this.recentPostScroll}
              >
                <div
                  className="recentPostContainer"
                  style={{
                    width: this.state.recentPostContWidth
                  }}
                >
                  {/* <CustomScrollBar
                    className="recentPostScroll"
                    onScroll={this.recentPostScroll}
                  >
                    {recentPostsJSX}
                  </CustomScrollBar> */}
                  <SimpleBar>{recentPostsJSX}</SimpleBar>
                </div>
              </div>
            </div>

            <div className="grid col-4 col-12-md  asideContenedor">
              <AsidePost
                asideTitle="Popular Posts"
                onScroll={this.popPostScroll}
                device={this.state.device}
                postSectionHeight={this.state.popPostSectionHeight}
                postContWidth={this.state.popPostContWidth}
              >
                {popularPostsJSX}
              </AsidePost>
            </div>
            {this.state.device !== "pc" ? footerBlog : null}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogComponent;
