import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'

//assets
import {check, equis} from '../../../assets/svgIcons/SvgIcons'

const ReplyCard = styled.div`
  padding: 15px 30px 20px 15px;
  @media (max-width: 700px) {
    padding: 0 0 15px 0;
  }
  display: flex;
  box-sizing: border-box;
  width: 100%;
`

const AvatarCont = styled.div`
  width: 50px;
  margin: 0 15px 0 0;
  @media (max-width: 700px) {
    margin: 0 10px 0 0;
    width: 35px;
  }
`

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
`

const ReplyCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
`

const UserInfo = styled.div`
  margin: 10px 0 10px 0;
  @media (max-width: 700px) {
    margin: 10px 0 10px 0;
  }
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  color: var(--orange);
  font-size: 18px;
  @media (max-width: 700px) {
    font-size: 14px;
  }
  font-weight: bold;
`
const ReplyDate = styled.span`
  color: var(--blueDark);
  font-size: 12px;
  font-weight: 300;

  margin: 0 0 0 5px;
`

const Text = styled.textarea`
  font-weight: normal;
  border-radius: 5px;
  height: 24vh;
  font-size: 18px;
  padding: 15px;

  @media (max-width: 700px) {
    font-size: 14px;
    padding: 7px;
  }
`

const IconLayot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  svg:hover {
    cursor: pointer;
  }
`

const Icon1 = styled.div`
  svg {
    fill: #0387b7;
    width: 25px;
    margin: 10px;
  }
`

const Icon2 = styled.div`
  svg {
    fill: var(--orange);
    width: 20px;
    margin: 10px;
  }
`

const ReplyEditor = ({
  setReplyEditor,
  index,
  setGlobalComments,
  userName,
  userAvatar,
  title,
  comments,
  userID
}) => {
  const [responseText, setResponseText] = useState('')

  const responseHandler = e => {
    setResponseText(e.target.value)
  }

  const sendReplyHandler = () => {
    if (responseText === '') {
      return
    }
    axios
      .put(
        `api/setReply`,
        {message: responseText, userName, title, index, userID},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        if (res.data.message === 'ok') {
          let responses
          let replyToPush = {
            _id: res.data.id,
            userName: userName,
            userAvatar: userAvatar,
            message: responseText,
            date: new Date(),
            likes: 0
          }
          comments.forEach((comment, i) => {
            if (i === index) {
              responses = comment.responses

              if (responses) {
                responses = [replyToPush, ...responses]
              } else {
                responses = [replyToPush]
              }

              console.log('responses on set reply', responses)
            }
          })
          comments[index].responses = responses
          setGlobalComments(comments)
          setReplyEditor(false)
          setResponseText('')
        }
      })
      .catch(err => {
        console.log('err on setReply', err)
      })
  }

  return (
    // <ReplyCardLayout>
    <ReplyCard>
      <AvatarCont>
        <Avatar
          style={{
            backgroundImage: `url('${userAvatar}`
          }}
        />
      </AvatarCont>
      <ReplyCont>
        <UserInfo>
          <UserName>{userName}</UserName>
          <ReplyDate>now</ReplyDate>
        </UserInfo>
        <Text onChange={responseHandler} value={responseText} />
        <IconLayot>
          <Icon1 onClick={sendReplyHandler}>{check}</Icon1>
          <Icon2
            onClick={() => {
              setReplyEditor(false)
              setResponseText('')
            }}
          >
            {equis}
          </Icon2>
        </IconLayot>
      </ReplyCont>
    </ReplyCard>
    // </ReplyCardLayout>
  )
}

const mapStateToProps = state => {
  return {
    userName: state.logInStatus.loggedUserName,
    userAvatar: state.logInStatus.loggedUserAvatar,
    userID: state.logInStatus.loggedUserID,
    title: state.article.title,
    comments: state.article.comments
  }
}
const mapDispachToProps = dispatch => {
  return {
    //acciones
    setGlobalComments: comments =>
      dispatch({type: 'SET_COMMENTS', payload: comments})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(ReplyEditor)
