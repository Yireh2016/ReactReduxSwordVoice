import React, { useState } from "react";
import styled from "styled-components";

import "./comment.css";

//assets
import { claps } from "../../assets/svgIcons/SvgIcons";
import dbDateToNormalDate from "../../../services/dbDateToNormalDate";
//component
import ReplyEditor from "./replyEditor/ReplyEditor";
import Reply from "./reply/Reply";

//store
import { store } from "../../../app.redux.store/store/configStore";

//api calls
import updateCommentClaps from "../../assets/apiCalls/updateCommentClaps";

const CommentCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommentCard = styled.div`
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 15px 30px 20px 15px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
`;

const AvatarCont = styled.div`
  width: 80px;
  margin: 0 15px 0 0;
  @media (max-width: 700px) {
    margin: 0 10px 0 0;
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  @media (max-width: 700px) {
    width: 50px;
    height: 50px;
  }
  border-radius: 100%;

  background-size: cover;
  background-position: center center;
`;

const CommentCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserInfo = styled.div`
  margin: 25px 0 25px 0;
  @media (max-width: 700px) {
    margin: 15px 0 15px 0;
  }
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  color: var(--orange);
  font-size: 24px;
  @media (max-width: 700px) {
    font-size: 18px;
  }
  font-weight: bold;
`;
const CommentDate = styled.span`
  color: var(--blueDark);
  font-size: 14px;
  font-weight: 300;
  @media (max-width: 700px) {
    font-size: 12px;
  }
  margin: 0 0 0 5px;
`;

const Text = styled.div`
  font-weight: 500;
  p:first-child {
    margin-top: 0;
  }
  @media (max-width: 700px) {
    p {
      font-size: 14px;
    }
  }
`;
const CommentFooter = styled.div`
  display: flex;
`;
const SocialInteractions = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  svg {
    height: 30px;
    width: 30px;
    fill: #ff9575;
    margin: 0 8px;
    transform: ${props =>
      props.rotate === true ? "rotate(180deg)" : "rotate(0deg)"};

    &:hover {
      cursor: pointer;
    }
  }
`;

const Counter = styled.span`
  color: #004059;
  font-weight: bold;
  font-size: 0.7rem;
  user-select: none;
`;

const ReplyBtn = styled.div`
  button {
    margin-right: 12px;
    width: 90px;
    height: 45px;
    @media (max-width: 700px) {
      width: 80px;
      height: 40px;
    }
    border: 1px solid rgba(249, 95, 11, 0.38);
    border-radius: 50px;
    color: white;
    background-color: var(--orange);
    float: right;
  }
  button:hover {
    color: var(--orange);
    background-color: white;
    cursor: pointer;
  }
`;

const MoreBtn = styled.button`
  width: 95px;
  height: 40px;
  @media (max-width: 700px) {
    width: 80px;
    height: 40px;
  }
  background: transparent;
  border: 1px solid rgba(249, 95, 11, 0);
  border-radius: 20px;
  margin: 15px 0;
  cursor: pointer;
  text-decoration: underline;
  color: blue;
`;

const ReplyCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const Comment = ({ index, userAvatar, userName, date, replies, message }) => {
  const [isReplyEditor, setReplyEditor] = useState(false);
  const [clapsAdder, setClapsAdder] = useState(0);
  const [clapsTimer, setClapsTimer] = useState();
  const state = store.getState();

  let article = state.article;
  const setCommentClaps = (index, count) => {
    store.dispatch({
      type: "SET_COMMENT_CLAPS",
      payload: { index, count }
    });
  };

  //reduxState
  const isUserLoggedIn = state.logInStatus.isUserLoggedIn;

  let repliesMap;
  if (replies) {
    repliesMap = replies.map((replyObj, i) => {
      const { userName, userAvatar, message, date, likes } = replyObj;
      return (
        <Reply
          key={i}
          userName={userName}
          userAvatar={userAvatar}
          message={message}
          date={dbDateToNormalDate(date)}
          likes={likes}
        />
      );
    });
  }

  const replyHandler = () => {
    setReplyEditor(!isReplyEditor);
  };

  const clapsAdderHandler = () => {
    if (clapsTimer) {
      clearTimeout(clapsTimer);
    }
    setClapsAdder(clapsAdder + 1);
    setCommentClaps(index, article.comments[index].claps + 1);
    const timer = setTimeout(() => {
      setClapsAdder(0);

      console.log(
        "article.comments[index].claps",
        article.comments[index].claps
      );
      //api call
      updateCommentClaps(article.title, index, article.comments[index].claps);

      return;
    }, 1000);
    setClapsTimer(timer);
  };

  return (
    <CommentCardLayout>
      <CommentCard>
        <AvatarCont>
          <Avatar
            style={{
              backgroundImage: `url('data:image/jpeg;base64,${userAvatar}')`
            }}
          />
        </AvatarCont>
        <CommentCont>
          <UserInfo>
            <UserName>{userName}</UserName>
            <CommentDate>{dbDateToNormalDate(date)}</CommentDate>
          </UserInfo>
          <Text>
            <p>{message}</p>
          </Text>
          <CommentFooter>
            <SocialInteractions>
              <Icon
                style={{ position: "relative" }}
                onClick={() => {
                  clapsAdderHandler();
                }}
              >
                {clapsAdder !== 0 && (
                  <Counter
                    style={{
                      position: "absolute",
                      backgroundColor: "#004059",
                      color: "white",
                      borderRadius: "100%",
                      padding: "7px",
                      top: "-30px"
                    }}
                  >
                    +{clapsAdder}
                  </Counter>
                )}
                {claps}
              </Icon>
              <Counter>{article.comments[index].claps}</Counter>
            </SocialInteractions>
            {isUserLoggedIn && (
              <ReplyBtn>
                <button onClick={replyHandler}>Reply</button>
              </ReplyBtn>
            )}
          </CommentFooter>
        </CommentCont>
      </CommentCard>
      <MoreBtn>More...</MoreBtn>
      {isReplyEditor && (
        <ReplyEditor
          setReplyEditor={isReply => {
            setReplyEditor(isReply);
          }}
          index={index}
        />
      )}
      {replies && <ReplyCardLayout>{repliesMap}</ReplyCardLayout>}
    </CommentCardLayout>
  );
};

export default Comment;
