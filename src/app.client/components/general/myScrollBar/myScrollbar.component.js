import React, { Component } from "react";
import "./myScrollBar.css";

class MyScrollBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childWidth: "0",
      yBarTopScroll: 0,
      isOverflowY: false,
      yBarHeight: 0,
      yBarContHeight: "100%",
      yBarContTop: 0,
      yBarContLeft: 0,
      yBarContWidth: "initial",
      yBarBackTopScroll: 0,
      mouseDown: false,
      vertMouseCtrlWidth: "700px",
      vertBarContWidth: "",
      xClick: ""
    };
    this.parentContainer = React.createRef();
    this.grandParentContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("mouseup", () => {
      this.setState({ mouseDown: false });
    });
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const grandParent = this.grandParentContainer.current.parentElement;
   
   
    if (grandParent.offsetHeight < grandParent.scrollHeight) {
      // yBarContWidth width: `${scrollWidth + 20}px !important` // default 5px
      if (
        !this.state.isOverflowY &&
        this.state.yBarHeight !==
          Math.pow(grandParent.offsetHeight, 2) / grandParent.scrollHeight
      ) {
        this.setState({
          isOverflowY: true,
          yBarContHeight: grandParent.offsetHeight,
          yBarHeight:
            Math.pow(grandParent.offsetHeight, 2) / grandParent.scrollHeight,
          // yBarContTop: grandParent.getClientRects()[0].top,
          yBarContLeft: grandParent.clientWidth
        });
      }
    }

    if (grandParent.offsetWidth < grandParent.scrollWidth) {
    }

    if (this.state.childWidth !== grandParent.clientWidth) {

      this.setState({ childWidth: grandParent.clientWidth });
    }
  }

  movingScrollY = (deltaY, step) => {
    const paso = step;
    const grandParent = this.grandParentContainer.current.parentElement;

    let scrollTop = grandParent.scrollTop;
    const overflowMax = grandParent.scrollHeight;
    const boxSize = grandParent.offsetHeight;
    const scrollMax = overflowMax - boxSize;

    if (deltaY < 0) {
      if (scrollTop - paso > 0) {
        scrollTop = scrollTop - paso;
        grandParent.scrollTop = scrollTop;
        this.setState(prevState => {
          return {
            yBarTopScroll:
              prevState.yBarTopScroll - (paso * boxSize) / overflowMax,
            yBarBackTopScroll: prevState.yBarBackTopScroll - paso
          };
        });
      } else {
        grandParent.scrollTop = 0;
        this.setState(() => {
          return {
            yBarTopScroll: 0,
            yBarBackTopScroll: 0
          };
        });
      }
    }
    if (deltaY > 0) {
      //bajando

      if (scrollTop + paso <= scrollMax) {
        //mientras no llegue al final del scroll
        //
        grandParent.scrollTop = scrollTop + paso; //aumento el scroll de acuerdo al paso
        this.setState(prevState => {
          return {
            yBarTopScroll:
              prevState.yBarTopScroll + (paso * boxSize) / overflowMax,
            yBarBackTopScroll: prevState.yBarBackTopScroll + paso
          };
        });
        //
      } else {
        grandParent.scrollTop = scrollMax;
        let diffPaso = scrollMax - scrollTop;
        if (diffPaso === 0) {
          return;
        }
        this.setState(prevState => {
          return {
            yBarTopScroll:
              prevState.yBarTopScroll + (diffPaso * boxSize) / overflowMax,
            yBarBackTopScroll: prevState.yBarBackTopScroll + diffPaso
          };
        });
      }
    }
  };

  handleScrollOnWheel = e => {
    e.preventDefault();
    this.movingScrollY(e.deltaY, 50);
  };
  mUpHandler = e => {
    // this.setState({ mouseDown: false, yBarContWidth: "initial" });

    if (this.state.mouseDown) {
      this.setState(prevState => {
        // const width = 600;
        return {
          mouseDown: false
          // yBarContWidth: "initial",
          // yBarContLeft:
          //   prevState.yBarContLeft + (width - this.props.barWidth) / 2
        };
      });
    }
  };
  mDownHandler = e => {
    e.preventDefault();
    const clientX = e.clientX;

    // this.setState({ mouseDown: true, yBarContWidth: "600px",yBarContLeft: prevState.yBarContLeft-300});

    this.setState(prevState => {
      // const width = 600;

      return {
        mouseDown: true,
        xClick: clientX
        // yBarContLeft: prevState.yBarContLeft + (this.props.barWidth - width) / 2
      };
    });
  };
  mMoveHandler = e => {
    e.preventDefault();
    if (
      this.state.mouseDown &&
      e.clientX > this.state.xClick - 200 &&
      e.clientX < this.state.xClick + 200
    ) {
      const grandParent = this.grandParentContainer.current.parentElement;

      const overflowMax = grandParent.scrollHeight;
      const boxSize = grandParent.offsetHeight;
      const cursorY = e.clientY;

      grandParent.scrollTop =
        ((cursorY - grandParent.offsetTop) / boxSize) * overflowMax;
 

      if (cursorY - grandParent.offsetTop >= boxSize - this.state.yBarHeight) {
        this.setState({ yBarTopScroll: boxSize - this.state.yBarHeight });
        return;
      }

      this.setState({ yBarTopScroll: cursorY - grandParent.offsetTop });
    } else {
      this.mLeaveHandler();
    }
  };

  mLeaveHandler = () => {
    if (this.state.mouseDown) {
      const grandParent = this.grandParentContainer.current.parentElement;
      grandParent.scrollTop = 0;
      this.setState({ yBarTopScroll: 0 });
    }
  };

  mEnterHandler = () => {
    if (!this.state.mouseDown) {
      this.setState(prevState => {
        return { yBarTopScroll: prevState.yBarTopScroll };
      });
    }
  };
  mClickHandler = e => {
    const grandParent = this.grandParentContainer.current.parentElement;
    if (
      e.clientY >
      this.state.yBarTopScroll + grandParent.offsetTop + this.state.yBarHeight
    ) {
      this.movingScrollY(+1, grandParent.offsetHeight);
      return;
    }
    if (e.clientY < this.state.yBarTopScroll + grandParent.offsetTop) {
      this.movingScrollY(-1, grandParent.offsetHeight);
      return;
    }
  };
  render() {
    const scrollWidth = this.props.scrollWidth ? this.props.scrollWidth : 5; //default 5px
    const barWidth = this.props.barWidth ? this.props.barWidth : 8; //default 5px

    return (
      <div
        ref={this.grandParentContainer}
        className="grandParentContainer"
        style={{
          width: `calc(100% - ${barWidth}px)`,
          height: `calc(100% - ${0})`
        }}
        onWheel={e => this.handleScrollOnWheel(e)}

        // onClick={e => this.handleScroll(e)}
      >
        <div ref={this.parentContainer} className="parentContainer">
          {this.props.children}
        </div>

        <div
          className="verticalScrollBarCont"
          onMouseUp={e => {
            this.mUpHandler(e);
          }}
          // onMouseLeave={e => {
          //   this.mLeaveHandler(e);
          // }}
          onMouseEnter={e => {
            this.mEnterHandler(e);
          }}
          onMouseMove={e => {
            this.mMoveHandler(e); //vertBarContLeft vertBarContWidth
          }}
          style={{
            left: `${this.state.yBarContLeft - barWidth}px`, //`${this.state.childWidth - scrollWidth}px`,
            // top: `${this.state.yBarContTop}px`,
            top: `${0}px`,
            display: `${this.state.isOverflowY ? "block" : "none"}`,
            height: `${this.state.yBarContHeight}px`,
            width: `${this.state.yBarContWidth}`
          }}
        >
          <div
            className="verticalScrollBarBack"
            onClick={e => {
              this.mClickHandler(e);
            }}
            style={{
              top: `${this.state.yBarBackTopScroll}px`,
              display: `${this.state.isOverflowY ? "block" : "none"}`,
              height: `${this.state.yBarContHeight}px`,
              width: `${barWidth}px !important` // default 5px
            }}
          >
            <div
              className={"verticalScrollBar" + ` ${this.props.className}`}
              onMouseDown={e => {
                this.mDownHandler(e);
              }}
              style={{
                ...this.props.style,

                top: `${this.state.yBarTopScroll}px`,
                display: `${this.state.isOverflowY ? "block" : "none"}`,
                height: `${this.state.yBarHeight}px`,
                width: `${scrollWidth}px !important` // default 5px
              }}
            />
          </div>
        </div>

        <div className="horizontalScrollBar" />
      </div>
    );
  }
}

export default MyScrollBar;
