import React from "react";
import "./oldComment.css";
import Response from "../../response/Response";

const OldComment = props => {
  return (
    <div className="oldCommentsLayout fila">
      <div className="fila">
        <div>
          <div className="col-12 grid oldAvatarCont">
            <div>
              <div
                className="oldAvatarImg avatarImg"
                style={{
                  backgroundImage: "url(" + props.userAvatar + ")"
                }}
              />
            </div>
            <p>
              <span className="userName">{props.userName} </span>
              <br />
              <span className="verbName">wrote:</span>
            </p>
          </div>
          <div className="col-12 grid">
            <p>{props.comments}</p>
          </div>
          <div className="postDateCont">
            <span className="postDate">{props.date}</span>
          </div>
        </div>
      </div>
      <Response
        userAvatar={props.replies[0].userAvatar}
        userName={props.replies[0].userName}
        comments={props.replies[0].comment}
        date={props.replies[0].date}
        likes={props.replies[0].likes}
      />
      <hr />
    </div>
  );
};

export default OldComment;
