//modulos
import React, { Component } from "react";
import JsxParser from "react-jsx-parser";
import axios from "axios";
import b64toBlob from "b64-to-blob";
import { connect } from "react-redux";
//css
import "./blogPost.css";
//componentes
import AsidePost from "../asidePost/asidePost.component";
import OldComment from "./oldComment/oldComment.component";
import NewComment from "./newComment/newComment.component";
import EnableComment from "./enableComment/enableComment.component";
import Navbar from "../../navbar/navbar.component";
import Post from "../post/post.component";
import Summary from "../common/summary/summary.component";
import Call2Action from "../../general/call2action.component";
import FooterApp from "../../footer/footer.component";
import Logo from "../../general/logo.component";
import SignUpForm from "./signUpForm/signUpForm.component";
import LogInForm from "./logInForm/logInForm.component";
import Summary2 from "../common/summary/summary2.component";
// import SearchBar from "../searchBar.component";
//imagenes
import newPostImg from "../../../assets/img/blog/newPost.jpg";
import fondoImg from "../../../assets/img/blog/fondoBlog.jpg";
import avatarImg from "../../../assets/img/general/avatar.jpg";
//servicios
import {
  isLoggedIn,
  saveToken,
  getTokenData,
  getToken
} from "../../../services/auth";

// import CustomScrollBar from "../../general/customScrollBar.component";

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
      loggedUserName: ""
    };
  }
  componentDidMount() {
    console.log("this.props", this.props);
    const winWidth = window.innerWidth;
    let device;

    if (winWidth <= 700) {
      device = "phone";
    } else if (winWidth > 700 && winWidth < 1050) {
      device = "tablet";
    } else {
      device = "pc";
    }

    this.setState({ device: device });

    const similDataArray = this.fetchData();
    //esto cabio porque ya no tengo token
    // if (getToken() && isLoggedIn()) {
    //   // this.props.onLogIn();
    //   const token = getToken();
    //   const tokenData = getTokenData(token);
    //   console.log("tokenData", tokenData);
    //   // this.setUserFromId(userId);
    // }

    const win = window.innerWidth * 0.6;
    //Redux: guardar en el store el tipo de dispositivo
    this.setState({
      // isUserLoggedIn: isLoggedIn(),
      similPostContWidth:
        this.state.device === "pc"
          ? "100%"
          : similDataArray.length * win + "px",

      similPostsArray: similDataArray
    });
  }
  componentDidUpdate() {
    console.log(
      `this.props.isLoggedIn es ${
        this.props.isUserLoggedIn
      } y window ${window.localStorage.getItem(
        "userAvatar"
      )} y this.state.loggedUserAvatar ${this.state.loggedUserAvatar}`
    );
    if (
      this.props.isUserLoggedIn &&
      window.localStorage.getItem("userAvatar") &&
      this.state.loggedUserAvatar === ""
    ) {
      console.log("cambiando estado");
      this.setState({
        loggedUserAvatar: window.localStorage.getItem("userAvatar")
      });
      console.log(" estado nuevo ", this.state);
    } else {
      console.log("nocambie estado");
    }
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
              dislikes: 2,
              reply: [
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  comment:
                    "This is my second Comment on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5,
                  dislikes: 2
                },
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  comment:
                    "This is my second Comment on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5,
                  dislikes: 2
                }
              ]
            },
            {
              userName: "Anais Valera",
              userAvatar: fondoImg,
              comment: "jejejej",
              date: "April 30th, 2016",
              likes: 5,
              dislikes: 2,
              reply: [
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  comment:
                    "This is my second Comment on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5,
                  dislikes: 2
                },
                {
                  userName: "Jainer Munoz",
                  userAvatar: avatarImg,
                  comment:
                    "This is my second Comment on this...I've had to said it again. Thankssssss",
                  date: "August 21th, 2018",
                  likes: 5,
                  dislikes: 2
                }
              ]
            }
          ]
        },

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
						</p>`
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

        console.log("dispatch LOGGED_IN");

        this.props.onLogIn({
          loggedUserAvatar: imgBlob,
          userName: res.data.userName
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
    const newPostData = this.fetchArticle();
    const bindings = newPostData[0].articleProps;
    const widthHeightRatio = 1.07;

    const comments = newPostData[0].articleProps.comments.map(
      (commentsData, i) => {
        return (
          <OldComment
            key={i}
            userAvatar={commentsData.userAvatar}
            userName={commentsData.userName}
            comments={commentsData.comment}
            date={commentsData.date}
          />
        );
      }
    );

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
    const similarPostsArray = this.state.similPostsArray;
    const similarPostsJSX = similarPostsArray.map((similarPostsContent, i) => {
      const bindings = similarPostsContent.articleProps;
      const summaryComponent = height => {
        return (
          <Summary2
            textHTML={bindings.summaryText}
            date={bindings.date}
            avatar={bindings.authorAvatar}
            author={bindings.author}
            keywords={bindings.categories}
            width={height * 0.95}
            height={height}
          />
          // <Summary
          //   widthHeightRatio="1.640107407407407"
          //   summaryParagraphHeight={0.34}
          //   summary={bindings.summaryText}
          //   date={bindings.date}
          //   avatar={bindings.authorAvatar}
          //   author={bindings.author}
          //   categories={bindings.categories}
          //   summaryTextHeight={
          //     this.state.device === "pc" ? `${height}` : "13vh"
          //   }
          //   summaryText="summaryTextBlogPost"
          //   hasReadMore={true}
          //   hasSummaryTitle={true}
          //   className="summaryTextScrollPost"
          // />
        );
      };

      return (
        <div key={i} className="grid popularPost-article">
          <Post
            postImage={similarPostsContent.articleProps.image}
            postTitle={similarPostsContent.articleProps.title}
            widthHeightRatio={widthHeightRatio}
            hasBorder={true}
            summaryComponent={summaryComponent}
          />
        </div>
      );
    });
    return (
      <div id="blogPostPage">
        <Navbar hasBackground="true" />
        <div className="postHero fila">
          <div
            className="postHeroBack"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 64, 89, 0.58) 0, rgba(0, 0, 0, 0.72) 59.12%), url(" +
                bindings.image +
                ")",
              borderRadius: "0px 80px 0 0",
              transform: "matrix(1, 0, 0, 1, 0, 0)"
            }}
          />
          <div className="grid col-1 relleno col-1-md" />
          <div className="blogPostTitle grid col-7 col-10-md col-12-sm">
            <div className="blogPostTitleBackCont">
              <div
                className="blogPostTitleBack"
                style={{
                  backgroundImage: "url(" + bindings.image + ")"
                }}
              />{" "}
            </div>
            <div className="blogPostTitleText">
              <h1>{bindings.title}</h1>
            </div>
          </div>
          <div className="blogPostSummary grid  ">
            <Summary
              hasSummaryTitle={true}
              widthHeightRatio="1.640107407407407"
              summary={bindings.summaryText}
              date={bindings.date}
              avatar={bindings.authorAvatar}
              author={bindings.author}
              categories={bindings.categories}
              summaryTextHeight={this.state.device === "pc" ? "60vh" : "13vh"}
              summaryParagraphHeight={2}
              summaryText="summaryTextBlogPost"
              hasReadMore={false}
              className="summaryTextScroll"
            />
          </div>
        </div>

        <div className="grid col-0 relleno" />
        <div className="googleAdBanner grid col-12">
          Compra cosas que no quieres
        </div>
        <div className="blogArticle grid col-8 col-12-md">
          <article>
            <JsxParser bindings={bindings} jsx={newPostData[0].articleJSX} />
          </article>
          <div className="googleAdBanner grid col-12">
            Compra cosas que no quieres
          </div>

          <section>
            <h2>Leave your comments:</h2>

            {this.props.isUserLoggedIn ? (
              <NewComment
                loggedUserName={this.props.loggedUserName}
                loggedUserAvatar={this.state.loggedUserAvatar}
              />
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
                onSuccessLogIn={userData => this.handleSuccessLogIn(userData)}
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
    );
  }
}
const mapStateToProps2 = state => {
  console.log("mapStateToProps state", state);
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar
  };
};
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: payload => dispach({ type: "LOGGED_IN", payload: payload }),
    onLogOut: () => dispach({ type: "LOGGED_OUT" })
  };
};

export default connect(
  mapStateToProps2,
  mapDispachToProps
)(BlogArticle);
// export default BlogArticle;
