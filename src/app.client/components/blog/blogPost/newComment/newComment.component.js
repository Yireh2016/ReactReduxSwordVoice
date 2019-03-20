//modules
import React from "react";
//css
import "./newComment.css";
//imagenes
import userLogo from "../../../../assets/img/general/userLogo.svg";
console.log("userLogo1", userLogo);
const NewComment = props => {
  return (
    <div className="commentLayoutCont fila">
      <div className="grid col-2 relleno" />

      <div className="commentCont grid col-6">
        <svg viewBox="0 0 72 79" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.6472 0.906157L34 59L70.8457 67.2717C70.8457 67.2717 76.7573 67.2746 45.6354 67.259C14.5136 67.2433 0.842405 78.4786 0.842405 78.4786C0.842405 78.4786 24.6668 46.3353 24.6567 22.9323C24.6466 -0.470619 24.6472 0.906157 24.6472 0.906157Z"
            fill="#0086B7"
          />
        </svg>
        <div className=" commentText">
          <textarea />
        </div>

        <div className="postItCont">
          <span>Post it</span>
          <svg
            viewBox="0 0 41 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.2616 24.7063L38.76 23.8384L37.2595 22.9743L2.95109 3.21771L1.4499 2.35324L1.45206 4.08554L1.50146 43.6844L1.50362 45.4167L3.00265 44.5485L37.2616 24.7063Z"
              fill="#00171F"
              stroke="#F95F0B"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="grid col-4 relleno" />

      <div className="grid col-4 avatarCont">
        <div>
          <div
            className="avatarImg"
            style={{
              //`url('data:image/jpeg;base64,${
              // this.props.loggedUserAvatar
              //       }`
              backgroundImage: `url(${
                props.loggedUserAvatar
                  ? `data:image/jpeg;base64,${props.loggedUserAvatar}`
                  : userLogo
              })`
            }}
          />

          <p>
            <span id="name">{props.loggedUserName} </span>
            <span>comment</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
