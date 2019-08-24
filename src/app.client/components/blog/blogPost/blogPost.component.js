//modulos
import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import Radium from "radium";
import styled from "styled-components";
import Helmet from "react-helmet";
//css
import "./blogPost.css";

//componentes
import AsidePost from "../asidePost/asidePost.component";
import NewComment from "./newComment/NewComment";
import EnableComment from "./enableComment/enableComment.component";
import Navbar from "../../navbar/navbar.component";
import Comment from "../../comment/Comment";
import Call2Action from "../../general/call2action.component";
import FooterApp from "../../footer/footer.component";
import Logo from "../../general/logo.component";
import SignUpForm from "./signUpForm/signUpForm.component";
import LogInForm from "./logInForm/logInForm.component";
import SocialBar from "../../socialBar/SocialBar";
import PostCard from "../../../pages/blog/postCard/PostCard";
import Loading from "../../loading/loading";
//imagenes
import newPostImg from "../../../assets/img/blog/newPost.jpg";
import fondoImg from "../../../assets/img/blog/fondoBlog.jpg";
import avatarImg from "../../../assets/img/general/avatar.jpg";

//services
import keywordsToArr from "../../../../services/keywordsToArr";
import isDevice from "../../../../services/isDevice";
import countingHTMLwords from "../../../services/countingHTMLwords";
//apiCalls
import getNewComments from "../../../../apiCalls/getNewComments";

const MoreComments = styled.div`
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-top: 40px;
  padding: ${props => (props.noPadding ? "0" : "15px 30px 20px 15px")};
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  background: #00171f;
  color: #00171f;
  color: coral;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

class BlogArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      device: "",
      summaryTextHeight: null,
      similPostSectionHeight: "200vh ",
      similPostContWidth: null,
      isUserLoggedIn: false,
      showSignUp: false,
      showLogIn: false,
      similPostsArray: [],
      loggedUserAvatar: "",
      loggedUserName: "",
      authorAvatar: "",
      similarPostsWidth: 341,
      isLoading: false
    };
  }
  componentDidMount() {
    const FETCH_POSTS = this.props.article.similarPosts.length;
    let similarPostsWidth;
    if (this.props.device === "pc") {
      similarPostsWidth = ((window.outerWidth * 4) / 12) * 0.8;
    } else if (this.props.device === "tablet") {
      similarPostsWidth = window.outerWidth / 2;
    } else {
      similarPostsWidth = window.outerWidth * 0.7;
    }
    // this.setState({ device: device });

    // const similDataArray = this.fetchData();

    const win = window.outerWidth * 0.6;
    //Redux: guardar en el store el tipo de dispositivo
    this.setState({
      similarPostsWidth,

      // isUserLoggedIn: isLoggedIn(),
      similPostContWidth:
        this.props.device === "pc" ? "100%" : FETCH_POSTS * win + "px",

      // similPostsArray: similDataArray,
      authorAvatar: this.props.article.avatar.replace("_big.", "_small.")
    });
  }

  static getDerivedStateFromProps(props) {
    if (props.isUserLoggedIn) {
      return { loggedUserAvatar: props.loggedUserAvatar };
    }
    return null;
  }

  onSignUpClick = () => {
    this.setState(prevState => {
      return {
        showSignUp: prevState.showSignUp ? false : true
      };
    });
  };
  onLogInClick = () => {
    this.setState(prevState => {
      return {
        showLogIn: prevState.showLogIn ? false : true
      };
    });
  };

  moreCommentsHandler = async () => {
    this.setState({ isLoading: true });
    const getNewCommentsRes = await getNewComments(
      this.props.article.id,
      this.props.article.comments.length
    );

    console.log("getNewCommentsRes", getNewCommentsRes);
    if (getNewCommentsRes.status === "OK") {
      this.props.setComments(getNewCommentsRes.comments);
    }
    this.setState({ isLoading: false });
  };

  render() {
    let keywordsMap = keywordsToArr(this.props.article.categories);
    keywordsMap = keywordsMap.map(word => {
      return (
        <span
          key={word}
          style={{
            fontSize: 24 * 0.4 < 12 ? "10px" : 24 * 0.4 + "px",
            backgroundColor: "hsla(196, 97%, 72%, 1)",
            padding: `${5}px`,
            margin: `0 ${10}px 0 0`,
            borderRadius: "10px"
          }}
        >
          {word}
        </span>
      );
    });

    const commentsMap = this.props.article.comments.map((comment, i) => {
      return (
        <Comment
          key={i}
          userAvatar={comment.userAvatar}
          userName={comment.userName}
          message={comment.message}
          date={comment.date}
          replies={comment.responses}
          index={i}
        />
      );
    });

    const footerBlog = (
      <footer className=" footerBlogLayoutContainer grid col-4 col-12-md">
        <div className="footerBlogContainer">
          <Logo
            className="footerBlogLogo "
            style={{ top: "100px" }}
            logoWidth="20vw"
          />
          <Call2Action className="call2ActionBlog" text="Blog" link="/blog" />
          <FooterApp
            id="blogpostPage"
            estilos="appear footer-blog "
            size="redesSociales-blog"
          />
        </div>
      </footer>
    );
    const similarPostArray = this.props.article.similarPosts;

    const similarPostsJSX = similarPostArray.map((post, i) => {
      let avatar;
      if (typeof post.avatar === "object") {
        avatar = JSON.stringify(post.avatar);
      } else if (typeof post.avatar === "string") {
        avatar = post.avatar;
      }

      return (
        <div key={i} className="popularPost-article">
          <PostCard
            id={`${i}`}
            title={post.title}
            postH={this.state.similarPostsWidth / 1.08}
            postImg={post.postImg.replace(
              `${post.postImg.match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]}`,
              `${post.postImg
                .match(/\/([\w-\s]+\.[a-z]{3,4})\)$/)[1]
                .replace(".", "_mobile.")}`
            )}
            postGradient={post.postGradient}
            hasSummary={true}
            keywords={post.keywords}
            author={post.author}
            date={post.date}
            url={`/blog/post/${post.url}`}
            avatar={avatar}
            summaryTextHtml={post.summaryTextHtml}
          />
        </div>
      );
    });
    return (
      <React.Fragment>
        <Helmet>
          <meta name="Description" content={`${this.props.article.summary}`} />
        </Helmet>
        <div id="blogPostPage">
          <Navbar hasBackground="true" />

          <div className="blogArticleContainer">
            <div className="blogArticle grid col-8 col-12-md">
              <article>
                <h1>{this.props.article.title}</h1>
                <div
                  id="articleDescriptionCard"
                  style={{
                    padding: "15px"
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundImage: `url(${this.state.authorAvatar})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        borderRadius: "100%"
                      }}
                    />
                    <div
                      style={{
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        fontSize: ".7rem",
                        color: "#004059",
                        textAlign: "right",
                        padding: "0 0 0 10px"
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {this.props.article.author}
                      </span>
                      <span>{this.props.article.date}</span>
                      <span
                        style={{
                          color: "coral",
                          fontWeight: "bold"
                        }}
                      >
                        {countingHTMLwords(this.props.article.html)} minutes
                        read
                      </span>
                    </div>
                  </div>
                </div>

                {ReactHtmlParser(
                  this.props.article.html.replace(/<h1>.*<\/h1>/g, "")
                )}
                {/* <JsxParser
                bindings={bindings}
                jsx={newPostData[0].articleProps.articleJSX}
              /> */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    color: "#004059",
                    background: "white"
                  }}
                >
                  <span
                    style={{
                      color: "#f95f0b",
                      fontSize: ".7rem",
                      fontWeight: "bold",
                      marginRight: "10px"
                    }}
                  >
                    Categories:
                  </span>
                  {keywordsMap}
                </div>
                <SocialBar />
              </article>
              <div className="googleAdBanner grid col-12">
                Compra cosas que no quieres
              </div>

              <section>
                <h2 id="commentsSection">Leave your comments:</h2>

                {this.props.isUserLoggedIn ? (
                  <React.Fragment>
                    <NewComment />
                  </React.Fragment>
                ) : (
                  <EnableComment
                    onSignUpClick={this.onSignUpClick}
                    onLogInClick={this.onLogInClick}
                  />
                )}
              </section>
              <section>
                {this.state.showSignUp && (
                  <SignUpForm
                    // onSuccessSignUp={userData => this.onSuccessSignUp(userData)}
                    onCancelClick={this.onSignUpClick}
                  />
                )}

                {this.state.showLogIn && (
                  <LogInForm
                    onCancelClick={this.onLogInClick}
                    onSuccessLogIn={userData =>
                      this.handleSuccessLogIn(userData)
                    }
                  />
                )}
              </section>
              <section>
                {commentsMap}

                {this.props.article.commentsCount >
                  this.props.article.comments.length && (
                  <MoreComments
                    onClick={this.moreCommentsHandler}
                    id="MoreComments"
                    noPadding={this.state.isLoading}
                  >
                    {this.state.isLoading ? <Loading /> : "More Comments..."}
                  </MoreComments>
                )}
              </section>
            </div>
            {footerBlog}

            <div className="grid col-4 col-12-md  asideContenedor">
              <AsidePost
                asideTitle="Similar Posts"
                // onScroll={this.similPostScroll}
                device={this.props.device}
                postSectionHeight={this.state.similPostSectionHeight}
                postContWidth={this.state.similPostContWidth}
              >
                {similarPostsJSX}
              </AsidePost>
            </div>
            <div className="googleAdVertical grid col-4 col-12-md">
              compra lo que no quieres
            </div>
            <div className="googleAdVertical grid col-4 col-12-md ">
              compra lo que no quieres
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps2 = state => {
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar,
    article: state.article,
    blog: state.blog,
    device: state.resize.device
  };
};

const mapActionsToProps = dispatch => {
  return {
    setComments: commentsArr =>
      dispatch({ type: "SET_COMMENTS", payload: commentsArr })
  };
};

const BlogArticle2 = Radium(BlogArticle);
export default connect(
  mapStateToProps2,
  mapActionsToProps
)(BlogArticle2);
// export default BlogArticle;
