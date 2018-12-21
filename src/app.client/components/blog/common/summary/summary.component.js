import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import SimpleBar from "simplebar-react";
//css

import "./summary.css";
//components
// import CustomScrollBar from "../../../general/customScrollBar.component";

class Summary extends React.Component {
  constructor(props) {
    super(props);
    /*creo una referencia para acceder a un elemento hijo del DOM virtual*/
    this.myRef = React.createRef();

    this.state = {
      summaryHeight: "10",
      isPC: undefined,
      summaryTextH: 0
    };
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener("resize", this.handleResize.bind(this));

    this.setState(() => {
      return {
        isPC: window.innerWidth > 1050 ? true : false,
        summaryTextH: this.myRef.current.clientHeight
      };
    });
    console.log("se termino de montar el sumamary ", this.state.summaryTextH);
  }
  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    if (this.myRef.current.clientHeight === 0) {
      this.setState(() => {
        return {
          summaryTextH: this.myRef.current.clientHeight
        };
      });
    }
    return null;
  }

  handleResize() {
    const node = this.myRef.current;
    const height = node.clientWidth * this.props.widthHeightRatio;
    this.setState({ summaryHeight: height + "px" });
  }
  render() {
    const categoryContent = this.props.categories.map((data, i) => {
      return (
        <React.Fragment key={i}>
          <div>{data.category}</div>
        </React.Fragment>
      );
    });

    const readMore = this.props.hasReadMore ? (
      <a
        style={{
          fontWeight: "bold",
          paddingLeft: "20px",
          fontSize: "initial"
        }}
        href="/blog/post"
      >
        Read More ...
      </a>
    ) : null;

    const summaryText =
      this.state.isPC === true ? (
        // <CustomScrollBar>
        //   <div className={this.props.summaryText}>
        //     {ReactHtmlParser(this.props.summary)}
        //   </div>
        // </CustomScrollBar>
        <SimpleBar>
          <div className={this.props.summaryText}>
            {ReactHtmlParser(this.props.summary)}
          </div>
        </SimpleBar>
      ) : (
        <div className={this.props.summaryText}>
          {ReactHtmlParser(this.props.summary)}
        </div>
      );

    return (
      <div
        className={this.props.className}
        ref={this.myRef}
        style={{
          backgroundColor: "white",
          borderRadius: "0px 30px",
          height: this.props.summaryTextHeight,
          // height:
          //   this.state.isPC === true
          //     ? `${this.props.summaryTextHeight}px`
          //     : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        {this.props.hasSummaryTitle === true && (
          <h3 className="summaryTitle">Summary</h3>
        )}
        {this.summaryAdaptableText}
        <section
          style={{
            height: `${this.props.summaryParagraphHeight *
              this.state.summaryTextH}px`
            // height:
            //   this.state.isPC === true
            //     ? `${this.props.summaryTextHeight - 250 - 39}px`
            //     : ""
          }}
        >
          {summaryText}
        </section>

        <div>{readMore}</div>
        <div className="categories fila">{categoryContent}</div>

        <div
          style={{
            width: "100%",
            paddingBottom: "20px"
          }}
        >
          <span className="summaryDate">{this.props.date}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              clear: "both",
              padding: "10px 0 0 20px"
            }}
          >
            <span
              className="summaryAvatar"
              style={{
                backgroundImage: "url(" + this.props.avatar + ")"
              }}
            />
            <span className="summaryAuthor">By {this.props.author}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
