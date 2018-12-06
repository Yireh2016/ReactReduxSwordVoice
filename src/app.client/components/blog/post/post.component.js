import React from "react";

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
    this.postTitleCont = React.createRef();

    this.state = {
      newPostHeight: "10",
      newPostWidth: "100%",
      postOpacity: "1",
      postTitle: this.props.postTitle
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
    console.log("componentDidUpdate");

    this.checkPostTitleOverflow();
  }
  checkPostTitleOverflow() {
    const element = this.postTitleCont.current;

    const hasOverflowingChildren = element.offsetHeight < element.scrollHeight;

    if (!hasOverflowingChildren) {
      return false;
    }

    console.log("hasOverflowingChildren", hasOverflowingChildren);
    let title = this.state.postTitle;
    console.log("title", title);

    title = this.spaceThreeDots(title, title.length - 5);
    this.setState({ postTitle: title });
  }
  componentDidMount() {
    console.log("componentDidMount");
    // this.checkPostTitleOverflow();
    this.handleResize();

    /*Para que mi newPost sea Fluido al resize la pantalla, creo un event handler que calcule el nuevo height*/
    if (window.addEventListener) {
      window.addEventListener("resize", this.handleResize.bind(this), false);
    } else if (window.attachEvent) {
      window.attachEvent("onresize", this.handleResize.bind(this));
    }

    /*window.addEventListener("resize", this.handleResize.bind(this));*/
  }
  handleOnMouseOver() {
    this.state.postOpacity === "1"
      ? this.setState({
          postOpacity: "0.25"
        })
      : this.setState({
          postOpacity: "1"
        });
  }

  handleResize() {
    /*invocando el metodo "current" de la referencia encuentro el nodo seleccionado */
    const node = this.myNewPostRef.current;
    /*Calculo el alto de mi elelemtno, basandome en el ancho sabiendo que el ratio de mi newPost es 1.3*/
    const height = node.clientWidth / this.props.widthHeightRatio;
    if (this.props.postHeight) {
      this.props.postHeight(height + (height * 2) / 59.57);
    }
    this.setState({
      newPostHeight: height
    });
  }
  render() {
    /*Relaciones o Ratios para componente fluido*/

    const fontRatioCalc = this.state.newPostHeight / 15.48766794439927; //15.48766794439927
    const lineHeightRatioCalc = this.state.newPostHeight / 10.76; //9.76   13.9
    const paddingDerIzq = this.state.newPostHeight / 18.95467515634779;
    const paddingArrAbj = this.state.newPostHeight / 20.8;
    const borderWidth = this.state.newPostHeight / 59.57;
    const spacing = this.state.newPostHeight / 83.4;
    const border =
      this.props.hasBorder === false
        ? "none"
        : borderWidth + "px solid #f95f0b";

    return (
      <div
        className={"postCompCont "}
        // + this.props.className
        onMouseOver={() => {
          this.handleOnMouseOver();
        }}
        onMouseOut={() => {
          this.handleOnMouseOver();
        }}
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
          ref={this.postTitleCont}
          className="postCompInnerTitle"
          style={{
            opacity: this.state.postOpacity
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
          <h2
            style={{
              fontSize: fontRatioCalc + "px",
              padding: paddingArrAbj + "px " + paddingDerIzq + "px",
              lineHeight: lineHeightRatioCalc + "px",
              letterSpacing: spacing + "px"
              // margin: "0",
              // fontWeight: "bold",
              // color: "white"
            }}
          >
            {/* agregar trespuntos suspensivos si hay overflow */}
            {`${this.state.postTitle}`}
          </h2>
        </div>
      </div>
    );
  }
}

export default Post;
