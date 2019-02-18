//modules
import React, { Component } from "react";
import SimpleBar from "simplebar-react";
import axios from "axios";
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
// import LightShadow from "../general/lightShadow/lightShadow.component";
//css
import "./blog.css";
//images
import newPostImg from "../../assets/img/blog/newPost.jpg";
import avatarImg from "../../assets/img/general/avatar.jpg";
import Summary2 from "../blog/common/summary/summary2.component";
//services
import isDevice from "../../../services/isDevice";
import keywordsToArr from "../../../services/keywordsToArr";
import paragraphService from "../../../services/paragraphService";

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
      popPostsArray: [
        {
          articleProps: {
            image: "",
            title: "",

            summaryText: ``,

            author: "",
            date: "",
            authorAvatar: "",
            categories: [""]
          }
        }
      ],
      device: "",
      recentPostsArray: [
        {
          articleProps: {
            image: "",
            title: "",

            summaryText: ``,

            author: "",
            date: "",
            authorAvatar: "",
            categories: [""]
          }
        }
      ],
      recentPostContWidth: null,
      // summaryTextHeight: null,
      newPostArray: [
        {
          articleProps: {
            image: "",
            title: "",

            summaryText: ``,

            author: "",
            date: "",
            authorAvatar: "",
            categories: [""]
          }
        }
      ]
    };
  }

  componentDidMount() {
    const device = isDevice();

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

    //esta parte debe ser asyncronica

    // const newPostArray = this.fetchNewPost();
    let data;
    axios("/api/getPosts/")
      .then(res => {
        if (res.status === 200) {
          data = res.data;
          console.log("res en GET", res);
          console.log("data en GET ", data);
          let newDataArr = [];

          for (let i = 0; i < data.length; i++) {
            newDataArr[i] = {
              articleProps: {
                image: avatarImg,
                title: data[i].title,

                summaryText: paragraphService(data[i].description),

                author: data[i].author,
                date: data[i].date,
                authorAvatar: avatarImg,
                categories: keywordsToArr(data[i].keywords)
              }
            };
          }

          const recentDataArray = newDataArr.slice(1);
          const popDataArray = newDataArr.slice(1);
          const newPostArr = newDataArr.slice(0, 1);
          console.log("newDataArr", newDataArr);
          console.log("recentDataArray", recentDataArray);
          console.log("popDataArray", popDataArray);
          console.log("newPostArr", newPostArr);
          this.setState({
            popPostsArray: newDataArr,
            recentPostsArray: newDataArr,
            popPostContWidth:
              device === "pc" ? "100%" : popDataArray.length * win + "px",
            recentPostContWidth:
              device === "pc" ? "100%" : recentDataArray.length * win + "px",
            recentPostsArray: recentDataArray,
            popPostsArray: popDataArray,
            newPostArray: newPostArr
          });
        }
      })
      .catch(err => {
        console.log("error ", err);
      });
  }

  // keywordsToArr = keywords => {
  //   if (
  //     keywords.slice(keywords.length - 1, keywords.length) !== "," &&
  //     keywords !== ""
  //   ) {
  //     keywords = keywords + ",";
  //   }
  //   let arr =
  //     keywords.match(/([^,])*,/g) === null ? [] : keywords.match(/([^,])*,/g);

  //   let arrLen = arr.length;

  //   for (let i = 0; i < arrLen; i++) {
  //     arr[i] = arr[i].substring(0, arr[i].length - 1);
  //   }

  //   return arr;
  // };
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
          categories: ["Desing", "UX/UI", "Web", "Mobile"]
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
    const mockData = this.fetchNewPost();
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
        return newData;
      }
    } else {
      const maxScroll = node.scrollWidth - node.clientWidth;

      if (node.scrollLeft == maxScroll) {
        newData = this.seeMorePosts(newData);
        return newData;
      }
    }

    return undefined;
  };
  recentPostScroll = e => {
    let newData;
    let prevData = this.state.recentPostsArray;
    newData = this.nodeScrollControl(e, prevData);

    if (newData) {
      this.setState(prevState => {
        const win = window.innerWidth * 0.6;
        return {
          recentPostContWidth:
            prevState.device === "pc" ? "100%" : newData.length * win + "px",
          recentPostsArray: newData
        };
      });
    }
  };
  popPostScroll = e => {
    let newData = this.state.popPostsArray;
    newData = this.nodeScrollControl(e, newData);
    if (newData) {
      this.setState(prevState => {
        const win = window.innerWidth * 0.6;
        return {
          popPostContWidth:
            prevState.device === "pc" ? "100%" : newData.length * win + "px",
          popPostsArray: newData
        };
      });
    }
  };

  render() {
    const widthHeightRatio = 1.07;

    const newPost = this.state.newPostArray;

    const popularPostsArray = this.state.popPostsArray;

    const popularPostsJSX = popularPostsArray.map((popularPostsContent, i) => {
      const bindings = popularPostsContent.articleProps;
      const summaryComponent = height => {
        return (
          <div
            style={{
              opacity: 0,
              animation: "SummaryIN 300ms ease 500ms forwards "
            }}
          >
            <Summary2
              textHTML={bindings.summaryText}
              date={bindings.date}
              avatar={bindings.authorAvatar}
              author={bindings.author}
              keywords={bindings.categories}
              width={height * 0.95}
              height={height}
            />
          </div>
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
            <div
              style={{
                opacity: 0,
                animation: "SummaryIN 300ms ease 500ms forwards "
              }}
            >
              <Summary2
                textHTML={bindings.summaryText}
                date={bindings.date}
                avatar={bindings.authorAvatar}
                author={bindings.author}
                keywords={bindings.categories}
                width={height * 0.9263}
                height={height}
              />
            </div>
          );
        };
        return (
          <div className=" recentPost-article " key={i}>
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
          {/* <LightShadow factor={-10}> */}
          <div ref={this.logoCursorMove}>
            <Logo
              className="footerBlogLogo "
              style={{ top: "100px" }}
              logoWidth="20vw"
            />
          </div>
          {/* </LightShadow> */}
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
                  <SimpleBar>
                    <div className="recentPost-layout">{recentPostsJSX}</div>
                  </SimpleBar>
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
