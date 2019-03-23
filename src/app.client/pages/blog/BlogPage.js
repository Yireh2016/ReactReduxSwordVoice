import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import Radium from "radium";
//assets
import blogBackground from "../../assets/img/blog/fondoBlog.jpg"; //'src\app.client\assets\img\blog\fondoBlog.jpg'
//components
import Summary from "../../components/blog/common/summary/summary2.component";

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
      backgroundImage: `radial-gradient(216.57px at 79.43% 71.15%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.41) 100%),url(${blogBackground})`,
      backgroundSize: "cover",
      backgroundPositionY: "center",
      backgroundPositionX: "center",
      height: `calc(100vh - ${navBarHeight})`,
      borderRadius: ` 0px ${headerRadius} 0px 0px`,
      boxSizing: "border-box"
    },
    post: {
      // width: `calc(100% - (${headerRadius} ))`,
      backgroundImage: mockProps.postImage,
      maxHeight: "100%",
      height: "574px",
      width: "590px",
      color: "white",
      position: "relative",
      borderRadius: "5px "
    }
  }
};
// uploads/newBlogTest/creative760.jpg hsla(322, 74%, 40%, 0.5)
// uploads/newBlogTest/creative760.jpg hsla(322, 74%, 40%, 0.5)
///uploads/luismi2/thumb-photo-1447433909565-04bfc496fe73.jpg hsla(31, 26%, 40%, 0.5)
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
  render() {
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
      </div>
    );
  }
}

export default Radium(BlogPage);
