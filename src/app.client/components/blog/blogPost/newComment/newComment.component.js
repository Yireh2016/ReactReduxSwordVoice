//modules
import React, { useState } from "react";
import { connect } from "react-redux";
//css
import "./newComment.css";
//imagenes
import userLogo from "../../../../assets/img/general/userLogo.svg";
import axios from "axios";

//services

const NewComment = ({
  loggedUserAvatar,
  userName,
  title,
  comments,
  setGlobalComments,
  setCommentsCount
}) => {
  const [comment, setComment] = useState("");

  const sendCommentHandler = () => {
    if (comment === "") {
      return;
    }
    axios
      .put(
        `api/setComment?message=${comment}&userName=${userName}&title=${title}`,
        {
          headers: {
            "Content-Type": "application/json"
          },
          loggedUserAvatar
        }
      )
      .then(res => {
        if (res.data.message === "ok") {
          let commentsToSet = comments;
          let commentToPush = {
            userName: userName,
            userAvatar: loggedUserAvatar,
            message: comment,
            date: new Date(),
            likes: 0
          };
          commentsToSet = [commentToPush, ...commentsToSet];
          setGlobalComments(commentsToSet);
          setCommentsCount(1);
          setComment("");
        }
      })
      .catch(err => {
        console.log("err on setComment", err);
      });
  };

  const commentHandler = e => {
    setComment(e.target.value);
  };

  let avatar;

  if (typeof loggedUserAvatar === "string") {
    avatar = (
      <div
        className="avatarImg"
        style={{
          //`url('data:image/jpeg;base64,${
          // this.loggedUserAvatar
          //       }`
          backgroundImage: loggedUserAvatar
            ? `url('data:image/jpeg;base64,${loggedUserAvatar.replace(
                /"/g,
                ""
              )}')`
            : userLogo
        }}
      />
    );
  }
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
          <textarea onChange={commentHandler} value={comment} />
        </div>

        <div className="postItCont">
          <span>Post it</span>
          <svg
            onClick={sendCommentHandler}
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
          {avatar}

          <p>
            <span id="name">{userName} </span>
            <span>comment</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps2 = state => {
  return {
    userName: state.logInStatus.loggedUserName,
    title: state.article.title,
    comments: state.article.comments
  };
};
const mapDispachToProps = dispatch => {
  return {
    //acciones
    setGlobalComments: comments =>
      dispatch({ type: "SET_COMMENTS", payload: comments }),
    setCommentsCount: (count = 1) =>
      dispatch({ type: "SET_COMMENTS_COUNT", payload: count })
    // onLogOut: () => dispatch({ type: "LOGGED_OUT" })
  };
};
export default connect(
  mapStateToProps2,
  mapDispachToProps
)(NewComment);
