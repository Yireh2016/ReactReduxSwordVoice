import React from "react";
import styled from "styled-components";
import Reply from "./reply/Reply";
import "./comment.css";

//assets
import { like } from "../../assets/svgIcons/SvgIcons";
import dbDateToNormalDate from "../../../services/dbDateToNormalDate";

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
    height: 20px;
    width: 20px;
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

const Comment = ({ userAvatar, userName, comments, date, likes, replies }) => {
  let repliesMap;
  if (replies) {
    repliesMap = replies.map((replyObj, i) => {
      const { userName, userAvatar, reply, date, likes } = replyObj;
      return (
        <Reply
          key={i}
          userName={userName}
          userAvatar={userAvatar}
          reply={reply}
          date={dbDateToNormalDate(date)}
          likes={likes}
        />
      );
    });
  }

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
            <p>{comments}</p>
          </Text>
          <CommentFooter>
            <SocialInteractions>
              <Icon>{like}</Icon>
              <Counter>{likes}</Counter>
            </SocialInteractions>
            <ReplyBtn>
              <button>Reply</button>
            </ReplyBtn>
          </CommentFooter>
        </CommentCont>
      </CommentCard>
      <MoreBtn>More...</MoreBtn>
      {replies && <ReplyCardLayout>{repliesMap}</ReplyCardLayout>}
    </CommentCardLayout>
  );
};

// userAvatar={commentsData.userAvatar}
//             userName={commentsData.userName}
//             comments={commentsData.comment}
//             date={commentsData.date}
//             likes={commentsData.likes}
//             replies={commentsData.replies}

export default Comment;
