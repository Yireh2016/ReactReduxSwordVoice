import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import Radium from "radium";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.

//assets
import blogBackground from "../../assets/img/blog/fondoBlog.jpg"; //'src\app.client\assets\img\blog\fondoBlog.jpg'
//components
import Summary from "../../components/blog/common/summary/summary2.component";
import TwoColumnAside from "../../layouts/TwoColumnAside";
import Logo from "../../components/general/logo.component";
import Call2Action from "../../components/general/call2action.component";
import FooterApp from "../../components/footer/footer.component";
import SearchBar from "../../components/blog/searchBar/searchBar.component";

//services
import isDevice from "../../../services/isDevice";

const mockProps = {
  postImage: {
    backgroundImage:
      "linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%,hsla(31, 26%, 40%, 0.5) 73.79%),url(uploads/luismi2/thumb-photo-1447433909565-04bfc496fe73.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    backgroundPosition: "center" //est puede cambiar y lo debe setear el usuario
  },
  summary: {
    textHTML: `
    <p>La Nasa descubrio un nuevo elemento en el espacio exterior ultracideral.</p>
    
    <p>Justo cuando la tabla periodica hasta ahora conocida acaba de cumplir 150 anos desde su puesta en escena, se encuetra este elemento que segun cientificos puede traer nuevas tecnologias en materia de energia con sigo mismo de mi.</p>
    `,
    keywords: ["Nasa", "Ciencia"],
    date: new Date(),
    avatar: "",
    author: "Arnoldo Swattzenigger"
  }
};

const navBarHeight = "93px";
const headerRadius = "139px";
const postHeight = 520;
let styles = {
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
      border: "3px solid #F95F0B",
      borderBottom: "none",
      backgroundImage: `radial-gradient(216.57px at 79.43% 71.15%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.41) 100%),url(${blogBackground})`,
      backgroundSize: "cover",
      backgroundPositionY: "center",
      backgroundPositionX: "center",
      height: `calc(100vh - ${navBarHeight})`,
      borderRadius: ` 0px ${headerRadius} 0px 0px`,
      boxSizing: "border-box"
    },
    post: {
      backgroundImage: mockProps.postImage,
      maxHeight: "100%",
      height: `${postHeight}px`,
      width: `${postHeight * 1.028}px`,
      color: "white",
      position: "relative",
      borderRadius: "5px ",
      margin: "5vmin 0",
      medium: {
        height: `${postHeight * 0.7}px`,
        width: `${postHeight * 1.028 * 0.7}px`
      },
      small: {
        height: `${postHeight * 0.4}px`,
        width: `${postHeight * 1.028 * 0.4}px`,
        margin: `1.25vmin 2.5vmin`
      }
    }
  }
};

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryWidth: 0,
      summaryHeight: 0
    };
    this.summaryContainer = React.createRef();
  }
  componentDidMount() {
    this.setState({
      summaryWidth: this.summaryContainer.current.clientWidth,
      summaryHeight: this.summaryContainer.current.clientHeight
    });
  }

  handleSearchBarFocus = () => {
    if (isDevice() !== "phone") {
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
    if (process.env.SERVER) {
      global.window = { location: { pathname: "" } }; // Temporarily define window for server-side
    }
    const footerBlog = (
      <footer className=" col-12 ">
        <div className="footerBlogContainer">
          {/* <LightShadow factor={-10}> */}
          <div ref={this.logoCursorMove}>
            <Logo
              className="footerBlogLogo "
              style={{ top: "100px" }}
              logoWidth="20vw"
            />
          </div>
          {isDevice() !== "pc" && (
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

    const aside = (
      <React.Fragment>
        <section id="popularPost">{footerBlog}</section>
        <div
          id="popularPostContainer"
          style={{ position: "sticky", top: "5vmin" }}
        >
          <div
            style={{
              height: "calc(100vh - 10vmin)"
            }}
          >
            <section>
              <div
                style={[
                  styles.layout.fullCenter,
                  styles.layout.flex,
                  styles.layout.flexColumn
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
                    height: "calc(100vh - 15vmin - 112px)"
                  },
                  styles.layout.flexColumn
                ]}
              >
                <h3
                  style={{
                    textAlign: "center",
                    color: "white",
                    position: "sticky",
                    top: "0",
                    zIndex: "2",
                    backgroundColor: "#00171f"
                  }}
                >
                  Popular Posts
                </h3>
                <div
                  id="postsContainer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>

                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>

                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>

                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>

                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>

                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>

                  <div
                    id="post"
                    style={[
                      styles.header.post,
                      styles.header.post.small,
                      styles.header.post.backgroundImage
                    ]}
                  >
                    <h4
                      id="postTitle"
                      style={[
                        {
                          bottom: "0",
                          padding: "3vmin",
                          position: "absolute",
                          color: "white",
                          fontFamily: "Work Sans"
                        }
                      ]}
                    >
                      Nasa descubre nuevo elemento en el espacio cideral
                      intergalactico.
                    </h4>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
    return (
      <div>
        <NavBar />
        <header
          id="blogHeader"
          style={[styles.layout.flex, styles.header.container]}
        >
          <section
            id="headerPostLayout"
            style={[
              styles.layout.fullCenter,
              styles.layout.flexRight,
              { width: "50vw" }
            ]}
          >
            <div
              id="post"
              style={[styles.header.post, styles.header.post.backgroundImage]}
            >
              <h3
                id="postTitle"
                style={[
                  {
                    bottom: "0",
                    padding: "3vmin",
                    position: "absolute",
                    color: "white",
                    fontFamily: "Work Sans"
                  }
                ]}
              >
                Nasa descubre nuevo elemento en el espacio cideral
                intergalactico.
              </h3>
            </div>
          </section>
          <section
            id="headerSummaryLayout"
            style={[styles.layout.fullCenter, { width: "50vw" }]}
          >
            <div
              ref={this.summaryContainer}
              id="summaryContainer"
              style={[
                {
                  width: "260px",
                  height: " 520px"
                }
              ]}
            >
              <Summary
                style={[
                  {
                    backgroundColor: "white",
                    borderRadius: "5px 5px 5px 40px",
                    height: "100%"
                  }
                ]}
                textHTML={mockProps.summary.textHTML}
                keywords={mockProps.summary.keywords}
                date={mockProps.summary.date}
                avatar
                author={mockProps.summary.author}
                width={this.state.summaryWidth}
                height={this.state.summaryHeight}
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
              zIndex: "2",
              justifyContent: "space-around"
            }}
          >
            <h2 id="recentPostTitleText">Recent Posts</h2>
            <div
              style={{
                display: " flex",
                padding: " 0 0 0 5vmin",
                alignItems: " center"
              }}
            >
              <SearchBar
                className="searchContainer"
                searchBorder={this.state.searchBorder}
                searchTranslateX={this.state.searchTranslateX}
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
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly"
              }}
            >
              <div
                id="post"
                style={[
                  styles.header.post,
                  styles.header.post.medium,
                  styles.header.post.backgroundImage
                ]}
              >
                <h3
                  id="postTitle"
                  style={[
                    {
                      bottom: "0",
                      padding: "3vmin",
                      position: "absolute",
                      color: "white",
                      fontFamily: "Work Sans"
                    }
                  ]}
                >
                  Nasa descubre nuevo elemento en el espacio cideral
                  intergalactico.
                </h3>
              </div>

              <div
                id="post"
                style={[
                  styles.header.post,
                  styles.header.post.medium,
                  styles.header.post.backgroundImage
                ]}
              >
                <h3
                  id="postTitle"
                  style={[
                    {
                      bottom: "0",
                      padding: "3vmin",
                      position: "absolute",
                      color: "white",
                      fontFamily: "Work Sans"
                    }
                  ]}
                >
                  Nasa descubre nuevo elemento en el espacio cideral
                  intergalactico.
                </h3>
              </div>

              <div
                id="post"
                style={[
                  styles.header.post,
                  styles.header.post.medium,
                  styles.header.post.backgroundImage
                ]}
              >
                <h3
                  id="postTitle"
                  style={[
                    {
                      bottom: "0",
                      padding: "3vmin",
                      position: "absolute",
                      color: "white",
                      fontFamily: "Work Sans"
                    }
                  ]}
                >
                  Nasa descubre nuevo elemento en el espacio cideral
                  intergalactico.
                </h3>
              </div>

              <div
                id="post"
                style={[
                  styles.header.post,
                  styles.header.post.medium,
                  styles.header.post.backgroundImage
                ]}
              >
                <h3
                  id="postTitle"
                  style={[
                    {
                      bottom: "0",
                      padding: "3vmin",
                      position: "absolute",
                      color: "white",
                      fontFamily: "Work Sans"
                    }
                  ]}
                >
                  Nasa descubre nuevo elemento en el espacio cideral
                  intergalactico.
                </h3>
              </div>

              <div
                id="post"
                style={[
                  styles.header.post,
                  styles.header.post.medium,
                  styles.header.post.backgroundImage
                ]}
              >
                <h3
                  id="postTitle"
                  style={[
                    {
                      bottom: "0",
                      padding: "3vmin",
                      position: "absolute",
                      color: "white",
                      fontFamily: "Work Sans"
                    }
                  ]}
                >
                  Nasa descubre nuevo elemento en el espacio cideral
                  intergalactico.
                </h3>
              </div>

              <div
                id="post"
                style={[
                  styles.header.post,
                  styles.header.post.medium,
                  styles.header.post.backgroundImage
                ]}
              >
                <h3
                  id="postTitle"
                  style={[
                    {
                      bottom: "0",
                      padding: "3vmin",
                      position: "absolute",
                      color: "white",
                      fontFamily: "Work Sans"
                    }
                  ]}
                >
                  Nasa descubre nuevo elemento en el espacio cideral
                  intergalactico.
                </h3>
              </div>
            </div>
          </section>
        </TwoColumnAside>
      </div>
    );
  }
}

export default Radium(BlogPage);
