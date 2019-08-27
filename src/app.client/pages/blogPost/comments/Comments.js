import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//component
import Comment from "../../../components/comment/Comment";
import NewComment from "./newComment/NewComment";
import EnableComment from "./enableComment/EnableComment";
import Loading from "../../../components/loading/loading";

//api calls
import getNewComments from "../../../../apiCalls/getNewComments";

const MoreComments = styled.div`
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-top: 40px;
  padding: ${props => (props.noPadding ? "0" : "15px 30px 20px 15px")};
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  background: #00171f;
  color: #00171f;
  color: coral;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

const CommentsCont = styled.div`
  padding: 50px;
  h1,
  h2 {
    color: #f95f0b;
  }
  h2 {
    font-size: 1.8rem;
  }

  figure img,
  img {
    width: 100%;
  }
  figure figcaption {
    text-align: center;
    font-size: 0.7rem;
    color: var(--blueDark);
  }
  p {
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    color: black;
  }

  a {
    color: #2e9ac2;
  }

  blockquote {
    border-left: 8px solid rgba(255, 127, 80, 0.580392);
  }

  blockquote p {
    margin-left: 15px;
  }
  > code,
  p > code,
  pre > code {
    line-height: 2;
    font-family: monospace;
    white-space: pre-wrap;
  }

  pre {
    background: #ff7f507a;
    border: 1px solid coral;
    padding: 5px;
    border-radius: 5px;
  }

  p > code {
    background: #ff7f507a;
    border: 1px solid coral;
    padding: 5px;
    border-radius: 5px;
  }

  hr {
    border-top: 3px solid rgba(255, 127, 80, 0.5);
    margin-top: 1rem;
  }

  @media (max-width: 1050px) {
    padding-left: 50px;
    p {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 700px) {
    padding: 12px 14px;
    h2 {
      padding: 15px 0 0 0;
    }
    p {
      font-size: 1.1rem;
      margin: 15px 0;
    }
    figure {
      margin: 0;
    }
    blockquote {
      margin: 0 0 0 10px;
    }
  }
`;

const Comments = ({ article, isUserLoggedIn, setComments }) => {
  const [isLoading, setIsLoading] = useState(false);

  const moreCommentsHandler = async () => {
    setIsLoading(true);
    const getNewCommentsRes = await getNewComments(
      article.id,
      article.comments.length
    );

    console.log("getNewCommentsRes", getNewCommentsRes);
    if (getNewCommentsRes.status === "OK") {
      setComments(getNewCommentsRes.comments);
    }
    setIsLoading(false);
  };

  const commentsMap = article.comments.map((comment, i) => {
    return (
      <Comment
        key={i}
        userAvatar={comment.userAvatar}
        userName={comment.userName}
        message={comment.message}
        date={comment.date}
        replies={comment.responses}
        index={i}
      />
    );
  });

  return (
    <CommentsCont>
      <section>
        <h2 id="commentsSection">Leave your comments:</h2>

        {isUserLoggedIn ? (
          <React.Fragment>
            <NewComment />
          </React.Fragment>
        ) : (
          <EnableComment />
        )}
      </section>
      {/* <section>
        {showSignUp && (
          <SignUpForm
            // onSuccessSignUp={userData => onSuccessSignUp(userData)}
            onCancelClick={onSignUpClick}
          />
        )}

        {showLogIn && (
          <LogInForm
            onCancelClick={onLogInClick}
            onSuccessLogIn={userData => handleSuccessLogIn(userData)}
          />
        )}
      </section> */}

      <section>
        {commentsMap}

        {article.commentsCount > article.comments.length && (
          <MoreComments
            onClick={moreCommentsHandler}
            id="MoreComments"
            noPadding={isLoading}
          >
            {isLoading ? <Loading /> : "More Comments..."}
          </MoreComments>
        )}
      </section>
    </CommentsCont>
  );
};

const mapStateToProps2 = state => {
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar,
    article: state.article
  };
};

const mapActionsToProps = dispatch => {
  return {
    setComments: commentsArr =>
      dispatch({ type: "SET_COMMENTS", payload: commentsArr })
  };
};

export default connect(
  mapStateToProps2,
  mapActionsToProps
)(Comments);
