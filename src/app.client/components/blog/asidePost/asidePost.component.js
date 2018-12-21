//modules
import React from "react";
import SimpleBar from "simplebar-react";
//components
// import CustomScrollBar from "../../general/customScrollBar.component";
// import MyScrollBar from "../../general/myScrollBar/myScrollbar.component";
//css
import "./asidePost.css";

const AsidePost = props => {
  return (
    <aside className="popPostSection">
      <h2>{props.asideTitle}</h2>
      <div className="popPostLayoutCont" onScroll={props.onScroll}>
        <div
          className="popPostContainer"
          style={{
            height:
              props.device === "pc"
                ? "calc(" + props.postSectionHeight + " - 80px)"
                : "",
            width: props.device === "pc" ? "inherit" : props.postContWidth
          }}
        >
          {/* {props.device === "pc" ? (
            <MyScrollBar>{props.children}</MyScrollBar>
          ) : ( */}
          {/* <CustomScrollBar className="popPostScroll" onScroll={props.onScroll}>
            {props.children}
          </CustomScrollBar> */}

          <SimpleBar className="popPostScroll" onScroll={props.onScroll}>
            {props.children}
          </SimpleBar>
        </div>
      </div>
    </aside>
  );
};

export default AsidePost;
