import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
// import { store } from "../../../../../app.redux.store/store/configStore";

//assets
import { esquinaChat, check } from "../../../../assets/svgIcons/SvgIcons";

const Container = styled.div`
  margin: 50px 0;
`;

const Header = styled.p`
  line-height: 1.18 !important;
  margin: 0 0 10px 10%;
  span {
    font-weight: bold;
    color: rgb(249, 95, 11);
  }
`;
const CommentLayout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatIcon = styled.div`
  svg {
    position: absolute;
    width: 46px;
    top: 0;
    fill: black;
    left: calc(10% - 50px);
  }

  @media (max-width: 700px) {
    svg {
      width: 20px;
    }
  }
`;

const Outer = styled.div`
  width: 80%;
  @media (max-width: 700px) {
    width: 100%;
  }
  height: 300px;
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(285.99deg, #004059 3.25%, #000000 96.7%);
`;
const Inner = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  background: white;
  padding-top: 15px;
`;
const TextLayout = styled.div`
  padding: 0 10% 0 13%;
  height: calc(100% - 65px - 15px - 28px);
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: 3% 5% 0 5%;
    height: calc(100% - 65px - 15px - 8px);
  }
`;
const Text = styled.textarea`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  border: 1px rgba(128, 128, 128, 0.38823529411764707) solid;
  font-family: "Work Sans", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: black;
  line-height: 20px;
  box-sizing: border-box;
  padding: 8px 11px;
  transition: padding 200ms ease;
  :focus {
    border: none;
    outline-color: var(--orange);
    padding: 10px 15px;
  }
`;
const UserLayout = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px 0 15px;
`;
const Avatar = styled.div`
  border-radius: 100%;
  width: 65px;
  height: 65px;
  background-size: cover;
  background-position: center center;
`;

const Username = styled.span`
  font-size: 20px;
  margin-left: 10px;
  font-weight: 600;
  color: rgb(249, 95, 11);
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px auto;
  width: 80%;
  div {
    display: flex;
    align-items: center;
    margin: 0 5%;

    :hover {
      cursor: pointer;
    }
    span {
      font-size: 20px;
      font-weight: 500;
    }
    svg {
      fill: rgb(249, 95, 11);
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
  }
`;

const NewComment = ({
  userName,
  avatar,
  title,
  comments,
  setGlobalComments,
  setCommentsCount
}) => {
  const [avatarState, setAvatar] = useState("");
  const [comment, setComment] = useState("");
  const [commentDisabled, setCommentDisabled] = useState(false);
  // const state = store.getState();
  // const avatar = state.logInStatus.avatar;
  // const userName = state.logInStatus.loggedUserName;

  useEffect(() => {
    setAvatar(avatar);
  }, []);

  const sendCommentHandler = () => {
    if (comment === "") {
      return;
    }

    setCommentDisabled(true);
    axios
      .put(`api/setComment?userName=${userName}&title=${title}`, {
        headers: {
          "Content-Type": "application/json"
        },
        avatar,
        message: comment
      })
      .then(res => {
        if (res.data.message === "ok") {
          let commentsToSet = comments;
          let commentToPush = {
            userName: userName,
            userAvatar: avatar,
            message: comment,
            date: new Date(),
            likes: 0
          };
          commentsToSet = [commentToPush, ...commentsToSet];
          setGlobalComments(commentsToSet);
          setCommentsCount(1);
          setComment("");
          setCommentDisabled(false);
        }
      })
      .catch(err => {
        console.log("err on setComment", err);
      });
  };

  const commentHandler = e => {
    setComment(e.target.value);
  };

  return (
    <Container id="container">
      <Header id="Header">
        <span>Your</span>
        <br /> Comment
      </Header>
      <CommentLayout id="CommentLayout">
        <ChatIcon id="ChatIcon">{esquinaChat}</ChatIcon>
        <Outer id="Outer">
          <Inner id="Inner">
            <UserLayout id="UserLayout">
              <Avatar
                id="Avatar"
                style={{
                  backgroundImage:
                    typeof avatarState === "string" &&
                    `url('data:image/jpeg;base64,${avatarState}`
                }}
              />
              <Username id="Username">{userName}</Username>
            </UserLayout>
            <TextLayout id="TextLayout">
              <Text
                id="Text"
                onChange={commentHandler}
                value={comment}
                disabled={commentDisabled}
              />
            </TextLayout>
          </Inner>
        </Outer>
      </CommentLayout>
      <Footer id="Footer">
        <div onClick={sendCommentHandler}>
          <span>Post It !!!</span>
          {check}
        </div>
      </Footer>
    </Container>
  );
};

const mapStateToProps2 = state => {
  return {
    userName: state.logInStatus.loggedUserName,
    avatar: state.logInStatus.loggedUserAvatar,
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
