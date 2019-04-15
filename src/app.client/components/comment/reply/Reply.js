import React from "react";
import styled from "styled-components";

//assets
import { like } from "../../../assets/svgIcons/SvgIcons";

const ReplyCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReplyCard = styled.div`
  padding: 15px 30px 20px 15px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
`;

const AvatarCont = styled.div`
  width: 50px;
  margin: 0 15px 0 0;
  @media (max-width: 700px) {
    margin: 0 10px 0 0;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  @media (max-width: 700px) {
    width: 35px;
    height: 35px;
  }
  border-radius: 100%;
  background-size: cover;
  background-position: center center;
`;

const ReplyCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const UserInfo = styled.div`
  margin: 10px 0 10px 0;
  @media (max-width: 700px) {
    margin: 15px 0 15px 0;
  }
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  color: var(--orange);
  font-size: 18px;
  @media (max-width: 700px) {
    font-size: 14px;
  }
  font-weight: bold;
`;
const ReplyDate = styled.span`
  color: var(--blueDark);
  font-size: 12px;
  font-weight: 300;

  margin: 0 0 0 5px;
`;

const Text = styled.div`
  font-weight: normal;
  p:first-child {
    margin-top: 0;
    font-size: 18px;
  }
  @media (max-width: 700px) {
    p {
      font-size: 14px;
    }
  }
`;
const ReplyFooter = styled.div`
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

const Reply = ({ userAvatar, userName, reply, date, likes }) => {
  return (
    // <ReplyCardLayout>
    <ReplyCard>
      <AvatarCont>
        <Avatar
          style={{
            backgroundImage: `url(${userAvatar})`
          }}
        />
      </AvatarCont>
      <ReplyCont>
        <UserInfo>
          <UserName>{userName}</UserName>
          <ReplyDate>{date}</ReplyDate>
        </UserInfo>
        <Text>
          <p>{reply}</p>
        </Text>
        <ReplyFooter>
          <SocialInteractions>
            <Icon>{like}</Icon>
            <Counter>{likes}</Counter>
          </SocialInteractions>
        </ReplyFooter>
      </ReplyCont>
    </ReplyCard>
    // </ReplyCardLayout>
  );
};

// userAvatar={replyData.userAvatar}
//             userName={replyData.userName}
//             reply={replyData.reply}
//             date={replyData.date}
//             likes={replyData.likes}
//             replies={replyData.replies}

export default Reply;
