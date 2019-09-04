import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//assets
import { esquinaChat, check } from "../../../../assets/svgIcons/SvgIcons"; //"../../../../assets/svgIcons/SvgIcons";
import apiSetComment from "../../../../apiCalls/apiSetComment";

const Container = styled.div``;

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
  width: 80%;
  margin: auto;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ChatIcon = styled.div`
  position: absolute;
  width: 46px;
  top: 0;

  left: ${props => -props.iconWidth + 5 + "px"};

  svg {
    fill: black;
  }

  @media (max-width: 700px) {
    width: 20px;
  }
`;

const Outer = styled.div`
  width: 100%;

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
  padding: 15px 0;
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

const UserNameCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Username = styled.span`
  font-size: 20px;
  margin-left: 10px;
  font-weight: 600;
  color: rgb(249, 95, 11);
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 20px auto;
  width: 80%;
`;

const PostItCont = styled.div`
  display: flex;
  justify-content: flex-end;
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

  div {
    display: inline-block;
  }
`;

const Note = styled.p`
  font-size: 16px !important;
  color: var(--blueDark);
  span {
    color: coral;
    font-weight: bold;
  }
`;

const NewComment = ({
  userName,
  userID,
  avatar,
  title,
  comments,
  setGlobalComments,
  setCommentsCount,
  note = true,
  preComment = "",
  editComment = null
}) => {
  const [avatarState, setAvatar] = useState("");
  const [comment, setComment] = useState("");
  const [commentDisabled, setCommentDisabled] = useState(false);
  const [iconWidth, setIconWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState();

  let chatIconRef = React.createRef();

  useEffect(() => {
    setAvatar(avatar);
  }, [avatar]);

  useEffect(() => {
    setComment(preComment);
  }, [preComment]);

  useEffect(() => {
    chatIconRef.current &&
      chatIconRef.current.clientWidth !== iconWidth &&
      setIconWidth(chatIconRef.current.clientWidth);
  }, [windowWidth]);

  const resizeHandler = () => {
    console.log("setting setWindowWidth", window.innerWidth);
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
  }, []);

  const sendCommentHandler = () => {
    if (comment === "") {
      return;
    }

    setCommentDisabled(true);

    apiSetComment(userID, userName, title, comment, "", id => {
      let commentsToSet = comments;
      let commentToPush = {
        _id: id,
        userName: userName,
        userAvatar: avatar, //ojo
        message: comment,
        date: new Date(),
        likes: 0,
        responses: [],
        userID,
        responsesCount: 0
      };
      commentsToSet = [commentToPush, ...commentsToSet];
      setGlobalComments(commentsToSet);
      setCommentsCount(1);
      setComment("");
      setCommentDisabled(false);
    });
  };

  const commentHandler = e => {
    setComment(e.target.value);

    editComment && editComment(e.target.value);
  };

  return (
    <Container id="container">
      <Header id="Header">
        <span>Your</span>
        <br /> Comment
      </Header>
      <CommentLayout id="CommentLayout">
        <ChatIcon ref={chatIconRef} id="ChatIcon" iconWidth={iconWidth}>
          {esquinaChat}
        </ChatIcon>
        <Outer id="Outer">
          <Inner id="Inner">
            <UserLayout id="UserLayout">
              <Avatar
                id="Avatar"
                style={{
                  backgroundImage:
                    typeof avatarState === "string" &&
                    `url(${avatarState})`.replace("big", "small")
                }}
              />
              <UserNameCont>
                <Username id="Username">{userName}</Username>
              </UserNameCont>
            </UserLayout>
            <TextLayout id="TextLayout">
              <label>
                <span id="commentText" style={{ visibility: "hidden" }}>
                  coment
                </span>
                <Text
                  htmlFor="commentTextInput"
                  aria-label="write comment"
                  aria-labelledby="commentText"
                  id="Text"
                  onChange={commentHandler}
                  value={comment}
                  disabled={commentDisabled}
                />
              </label>
            </TextLayout>
          </Inner>
        </Outer>
      </CommentLayout>
      <Footer id="Footer">
        {note && (
          <React.Fragment>
            <PostItCont onClick={sendCommentHandler}>
              <div>
                <span>Post It !!!</span>
                {check}
              </div>
            </PostItCont>
            <Note>
              <span>NOTE: </span> You may write comments in{" "}
              <a
                aria-label="go and check how to use markdown"
                href="https://commonmark.org/help/"
                rel="noopener"
                target="_blank"
              >
                Markdown
              </a>
              . This is the best way to post any code, inline like
              `&lt;div&gt;this&lt;/div&gt;` or multiline blocks within triple
              backtick fences (```) with double new lines before and after.
            </Note>
          </React.Fragment>
        )}
      </Footer>
    </Container>
  );
};

const mapStateToProps2 = state => {
  return {
    userName: state.logInStatus.loggedUserName,
    userID: state.logInStatus.loggedUserID,
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
