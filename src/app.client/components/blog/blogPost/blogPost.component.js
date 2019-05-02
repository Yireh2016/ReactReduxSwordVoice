//modulos
import React, { Component } from "react";
// import JsxParser from "react-jsx-parser";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import b64toBlob from "b64-to-blob";
import { connect } from "react-redux";
import Radium from "radium";
//css
import "./blogPost.css";

//componentes
import AsidePost from "../asidePost/asidePost.component";
import NewComment from "./newComment/newComment.component";
import EnableComment from "./enableComment/enableComment.component";
import Navbar from "../../navbar/navbar.component";
import Comment from "../../comment/Comment";
// import Summary from "../common/summary/summary.component";
import Call2Action from "../../general/call2action.component";
import FooterApp from "../../footer/footer.component";
import Logo from "../../general/logo.component";
import SignUpForm from "./signUpForm/signUpForm.component";
import LogInForm from "./logInForm/logInForm.component";
import SocialBar from "../../socialBar/SocialBar";
import PostCard from "../../../pages/blog/postCard/PostCard";
//imagenes
import newPostImg from "../../../assets/img/blog/newPost.jpg";
import fondoImg from "../../../assets/img/blog/fondoBlog.jpg";
import avatarImg from "../../../assets/img/general/avatar.jpg";

//services
import keywordsToArr from "../../../../services/keywordsToArr";
import isDevice from "../../../../services/isDevice";

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
      similarPostsWidth: 341
    };
  }
  componentDidMount() {
    const device = isDevice();
    let similarPostsWidth;
    if (device === "pc") {
      similarPostsWidth = ((window.outerWidth * 4) / 12) * 0.8;
    } else if (device === "tablet") {
      similarPostsWidth = window.outerWidth / 2;
    } else {
      similarPostsWidth = window.outerWidth * 0.7;
    }
    // this.setState({ device: device });

    const similDataArray = this.fetchData();
    //esto cabio porque ya no tengo token
    // if (getToken() && isLoggedIn()) {
    //   // this.props.onLogIn();
    //   const token = getToken();
    //   const tokenData = getTokenData(token);
    //   console.log("tokenData", tokenData);
    //   // this.setUserFromId(userId);
    // }

    const win = window.outerWidth * 0.6;
    //Redux: guardar en el store el tipo de dispositivo
    this.setState({
      device: device,
      similarPostsWidth,

      // isUserLoggedIn: isLoggedIn(),
      similPostContWidth:
        device === "pc" ? "100%" : similDataArray.length * win + "px",

      similPostsArray: similDataArray,
      authorAvatar: this.props.article.avatar
    });
  }
  componentDidUpdate() {
    if (
      //ojo esta asumiendo que el avatar estara en el localstorage, que passa si se llega aqui directo
      this.props.isUserLoggedIn &&
      window.localStorage.getItem("userAvatar") &&
      this.state.loggedUserAvatar === ""
    ) {
      this.setState({
        loggedUserAvatar: window.localStorage.getItem("userAvatar")
      });
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps props", props);
    console.log("getDerivedStateFromProps state", state);

    if (props.isUserLoggedIn) {
      return { loggedUserAvatar: props.loggedUserAvatar };
    }
    return null;
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
          autorAvatar: avatarImg,
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

  fetchArticle = () => {
    return [
      {
        articleProps: {
          image: newPostImg,
          title:
            "Confessions of a U.S. Postal Worker: “We deliver Amazon packages until we drop dead.”",
          widthHeightRatio: "1.3",
          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          articleJSX: `<h1>{title}</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
							est facere voluptate omnis porro minima nemo eaque ratione saepe
							totam cum, pariatur obcaecati, voluptates in eveniet! Ab minima
							autem nemo!
						</p>
						<p>
							Recuerda que tu experiencia en Medium está basada en los
							escritores, publicaciones y etiquetas que sigues, y hay mucho y
							bueno que seguir en nuestro idioma.
						</p>
						<figure>
							<img src={image}
								alt="article image"
								class="  grid col-12"
							/>
							<figcaption>Test Figure</figcaption>
						</figure>
						<h2>And finally: Protect the nerds</h2>
						<p>
							A computer programmer from Seattle is doing more to alleviate
							world poverty, hunger, and disease through the Bill & Melinda
							Gates Foundation than any other person in America right now. Nerds
							create vaccines. Nerds engineer bridges and roadways. Nerds become
							teachers and librarians. We need those obnoxiously smart people,
							because they make the world a better place. We can’t have them
							cowering before a society that rolls their eyes at every word they
							say. Ross needs better friends
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Quibusdam placeat recusandae nemo necessitatibus quidem, eum sint
							saepe eveniet accusantium porro numquam? Ab culpa veritatis, nam
							dolores commodi corporis, odio itaque.
						</p>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
							ipsam numquam porro laborum cupiditate minima voluptatem, aliquid
							quasi reiciendis. Officiis dolores, ad nam repellendus
							repudiandae. Ea similique facilis assumenda dolores.
						</p>
						<p>
							Dolores voluptatum modi itaque eos sequi eaque corrupti! Alias,
							facere suscipit consequuntur architecto reprehenderit atque sunt
							perferendis amet dicta illum molestias, enim consectetur eos quae
							esse aliquid, veniam quia quis!
						</p>
						<p>
							Unde accusamus repudiandae magnam ab quaerat, eligendi quae
							nesciunt ea id maxime. Illo, suscipit nesciunt explicabo esse
							vitae, porro tempora, reiciendis magnam itaque neque consequatur
							repudiandae, doloremque aliquam! Possimus, dignissimos!
						</p>
						<p>
							Ullam nesciunt quis cupiditate quia vel magni dicta eius in
							voluptatibus aperiam. Pariatur, non, ratione. Eum, quasi tempore
							ea eligendi aspernatur maxime ex earum. Vel quis doloremque odit,
							esse incidunt.
						</p>`,
          categories: [
            {
              category: "Design"
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
          ],
          comments: [
            {
              userName: "Jainer Munoz",
              userAvatar: avatarImg,
              comment:
                "This is my second Comment on this...I've had to said it again. Thankssssss",
              date: "August 21th, 2018",
              likes: 5,
              replies: [
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  reply:
                    "This is my second REPLYYYYYY on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5
                },
                {
                  userName: "Franci Calvetti",
                  userAvatar: avatarImg,
                  reply: "This is my second Comment on this...JAJAJAJAJA",
                  date: "August 25th, 2018",
                  likes: 5
                }
              ]
            },
            {
              userName: "Anais Valera",
              userAvatar: fondoImg,
              comment:
                "I found this very amazing. Can you take this even further???",
              date: "April 30th, 2016",
              likes: 5,
              replies: [
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  reply:
                    "This is my second Comment on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5
                },
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  reply:
                    "This is my second Comment on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5
                }
              ]
            }
          ]
        }
      }
    ];
  };
  seeMorePosts = newData => {
    //funcion para fetch la base de datos de nuevos post
    const mockData = this.fetchData();
    newData.push(...mockData);
    return newData;
  };

  nodeScrollControl = (e, newData) => {
    const node = e.target;
    //Redux leer device desde store
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

  setUserFromId = userId => {
    axios
      .get(`/api/users/${userId}`)
      .then(res => {
        let imgBlob = b64toBlob(res.data.userAvatar, "image/jpeg");
        //REDUX: despachar acciones redux que modifiquen el estado loggedUserAvatar,loggedUserName, isUserLoggedIn

        this.props.onLogIn({
          userAvatar: imgBlob,
          userName: res.data.userName,
          userID: userId
        });

        this.setState({
          loggedUserAvatar: imgBlob,
          loggedUserName: res.data.userName,
          isUserLoggedIn: true
        });
      })
      .catch(err => {
        console.log("there was an error on login auth get", err);
      });
  };
  similPostScroll = e => {
    let newData = this.state.similPostsArray;
    newData = this.nodeScrollControl(e, newData);

    this.setState(prevState => {
      const win = window.innerWidth * 0.6;
      return {
        similPostContWidth:
          prevState.device === "pc" ? "100%" : newData.length * win + "px",
        similPostsArray: newData
      };
    });
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
    // const newPostData = this.fetchArticle();
    // console.log(
    //   "newPostData[0].articleProps.comments",
    //   newPostData[0].articleProps.comments
    // );
    const comments = this.props.article.comments.map((commentsData, i) => {
      return (
        <Comment
          key={i}
          userAvatar={commentsData.userAvatar}
          userName={commentsData.userName}
          comments={commentsData.message}
          date={commentsData.date}
          likes={commentsData.likes}
          replies={commentsData.responses}
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
          <Call2Action className="call2ActionBlog" />
          <FooterApp estilos="appear footer-blog " size="redesSociales-blog" />
        </div>
      </footer>
    );
    const similarPostArray = this.props.blog.articlesArr;

    const similarPostsJSX = similarPostArray.map((post, i) => {
      let avatar;
      if (typeof post.avatar === "object") {
        avatar = JSON.stringify(post.avatar);
      } else if (typeof post.avatar === "string") {
        avatar = post.avatar;
      }

      return (
        <div key={i} className="grid popularPost-article">
          <PostCard
            title={post.title}
            postH={this.state.similarPostsWidth / 1.08}
            postImg={post.postImg}
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
        <div className="nolandscape">
          <span>This site is not landscape friendly</span>
          <span>Please, turn your device to portrait position. Thanks </span>
        </div>
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
                        backgroundImage: `url('data:image/jpeg;base64,${
                          this.state.authorAvatar
                        }')`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        borderRadius: "100%"
                      }}
                    />
                    <div
                      style={{
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
                    alignItems: "center",
                    color: "#004059"
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
                  <NewComment loggedUserAvatar={this.state.loggedUserAvatar} />
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
                {/*oldComments*/}
                {comments}
              </section>
            </div>
            {footerBlog}

            <div className="grid col-4 col-12-md  asideContenedor">
              <AsidePost
                asideTitle="Similar Posts"
                onScroll={this.similPostScroll}
                device={this.state.device}
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
    blog: state.blog
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload }),
    onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};
const BlogArticle2 = Radium(BlogArticle);
export default connect(
  mapStateToProps2,
  mapDispachToProps
)(BlogArticle2);
// export default BlogArticle;
