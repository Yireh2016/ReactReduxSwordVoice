import React from "react";
import threeDotsButton from "../../../assets/img/general/threeDots.svg";
import "./post.css";
/*Props
Imagen dentro del componente: postImage
Titulo del componente: postTitle
*/
class Post extends React.Component {
  constructor(props) {
    super(props);
    /*creo una referencia para acceder a un elemento hijo del DOM virtual*/
    this.myNewPostRef = React.createRef();
    this.postTitleH2 = React.createRef();

    this.state = {
      newPostHeight: "0",
      newPostWidth: "100%",
      postOpacity: "1",
      postTitle: this.props.postTitle,
      unModifiedPostTitle: this.props.postTitle,
      hasThreeDots:
        this.props.hasThreeDots === undefined ? true : this.props.hasThreeDots,
      isDetailsOpen: false
    };
  }

  spaceThreeDots(postTitle, space) {
    // if (postTitle.length > space) {
    let lastSpaceIndex;
    let title = postTitle + ".";
    let newTitle = "";
    for (let i = 0; i < space; i++) {
      newTitle = newTitle + title[i];
      if (title[i] === " ") {
        lastSpaceIndex = i;
      }
    }

    return newTitle.substr(0, lastSpaceIndex) + "...";
    // }
    // return postTitle;
  }

  componentDidUpdate() {
    if (this.postTitleH2.current) {
      this.checkPostTitleOverflow();
    }
  }
  threeDotsButtonClickHandler = () => {
    /*.postCompInnerTitle height: 100%; */
    /* transform: translateY(-68%); */
    // .threeDotsCont button img
    // transform=rotate(90deg)
    //
    console.log("this.state.isDetailsOpen", this.state.isDetailsOpen);
    this.setState(prevState => {
      return {
        isDetailsOpen: prevState.isDetailsOpen ? false : true
      };
    });

    // this.setState(prevState => {
    //   console.log("prevState", prevState);
    //   return { isDetailsOpen: !prevState.isDetailsOpen };
    // });
  };
  checkPostTitleOverflow() {
    const element = this.postTitleH2.current;

    const hasOverflowingChildren = element.offsetHeight < element.scrollHeight;

    if (!hasOverflowingChildren) {
      return false;
    }

    let title = this.state.postTitle;

    title = this.spaceThreeDots(title, title.length - 5);
    this.setState({ postTitle: title });
  }
  componentDidMount() {
    this.handleResize();

    /*Para que mi newPost sea Fluido al resize la pantalla, creo un event handler que calcule el nuevo height*/
    if (window.addEventListener) {
      window.addEventListener("resize", this.handleResize.bind(this), false);
    } else if (window.attachEvent) {
      window.attachEvent("onresize", this.handleResize.bind(this));
    }

    window.addEventListener("resize", this.handleResize.bind(this));

    if (this.state.hasThreeDots) {
      this.setState({ postTitleHeight: "calc(100% - 44px)" });
    } else {
      this.setState({ postTitleHeight: "100%" });
    }
  }
  // handleOnMouseOver() {
  //   this.state.postOpacity === "1"
  //     ? this.setState({
  //         postOpacity: "0.25"
  //       })
  //     : this.setState({
  //         postOpacity: "1"
  //       });
  // }

  handleResize() {
    /*invocando el metodo "current" de la referencia encuentro el nodo seleccionado */
    const node = this.myNewPostRef.current;
    /*Calculo el alto de mi elelemtno, basandome en el ancho sabiendo que el ratio de mi newPost es 1.3*/
    const height = node.clientWidth * this.props.widthHeightRatio;
    if (this.props.postHeight) {
      this.props.postHeight(height + (height * 2) / 59.57);
    }

    this.setState({
      newPostHeight: height
    });
  }
  render() {
    /*Relaciones o Ratios para componente fluido*/

    const fontRatioCalc = this.state.newPostHeight / 20.48766794439927; //15.48766794439927
    const lineHeightRatioCalc = this.state.newPostHeight / 10.76; //9.76   13.9
    const paddingDerIzq = this.state.newPostHeight / 18.95467515634779;
    const paddingArr = this.state.newPostHeight / 30.97;
    const borderWidth = this.state.newPostHeight / 59.57;
    const spacing = this.state.newPostHeight / 146;
    const border =
      this.props.hasBorder === false
        ? "none"
        : borderWidth + "px solid #f95f0b";

    return (
      <div
        className="postCompCont "
        // + this.props.className
        // onMouseOver={() => {
        //   this.handleOnMouseOver();
        // }}
        // onMouseOut={() => {
        //   this.handleOnMouseOver();
        // }}
        ref={this.myNewPostRef}
        style={{
          height: `${this.state.newPostHeight}px`,
          border: border
          // overflow: "hidden",
          // position: "relative"
        }}
      >
        <div
          className="postCompImg"
          style={{
            backgroundImage: `url(${this.props.postImage}`
            // height: "100%",
            // backgroundSize: "cover"
          }}
        />
        <div
          className="postCompInnerTitle"
          /*.postCompInnerTitle height: 100%; */
          /* transform: translateY(-68%); */

          style={{
            opacity: this.state.postOpacity,
            height: this.state.isDetailsOpen ? "100%" : "32%",
            transform: this.state.isDetailsOpen && "translateY(-68%)",
            backgroundColor: this.state.isDetailsOpen ? "white" : "#024259",
            border: this.state.isDetailsOpen
              ? "3px solid rgb(151, 196, 236)"
              : "none"
            // border: 3px solid rgb(151, 196, 236);

            // position: "absolute",
            // bottom: "0",
            // left: "0",
            // height: "30%",
            // backgroundColor: "#024259",
            // width: "100%",
            // transition: "opacity 1s ease",
            // transform: "translateY(0)"
          }}
        >
          {!this.state.isDetailsOpen && (
            <h2
              ref={this.postTitleH2}
              title={this.state.unModifiedPostTitle}
              style={{
                fontSize: fontRatioCalc + "px",
                padding: paddingArr + "px " + paddingDerIzq + "px " + "0",
                lineHeight: lineHeightRatioCalc + "px",
                letterSpacing: spacing + "px",
                color: this.state.isDetailsOpen ? "#024259 " : "white ",
                height: this.state.isDetailsOpen
                  ? "auto"
                  : this.state.postTitleHeight

                // margin: "0",
                // fontWeight: "bold",
                // color: "white"
              }}
            >
              {/* agregar trespuntos suspensivos si hay overflow */}
              {`${this.state.postTitle}`}
            </h2>
          )}

          {this.state.isDetailsOpen &&
            this.props.summaryComponent(this.myNewPostRef.current.clientHeight)}
          {this.state.hasThreeDots && (
            <div className="threeDotsCont">
              <button>
                <img
                  onClick={this.threeDotsButtonClickHandler}
                  style={{
                    transform: this.state.isDetailsOpen
                      ? "rotate(90deg)"
                      : "rotate(0deg)"
                  }}
                  src={threeDotsButton}
                  alt="three Dots Button"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Post;
