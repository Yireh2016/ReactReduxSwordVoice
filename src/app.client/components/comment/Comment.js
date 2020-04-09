import React, {useState} from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import {connect} from 'react-redux'

import './comment.css'

//assets
import {claps as clapsIcon, ellipsis} from '../../assets/svgIcons/SvgIcons'
import dbDateToNormalDate from '../../../services/dbDateToNormalDate'
//component
import ReplyEditor from './replyEditor/ReplyEditor'
import Reply from './reply/Reply'
import Modal from '../modal/modal'
import NewComment from '../blog/blogPost/newComment/NewComment'
import Loading from '../loading/loading'

//api calls
import updateCommentClaps from '../../apiCalls/updateCommentClaps'
import apiDeleteComment from '../../apiCalls/apiDeleteComment'
import apiSetComment from '../../apiCalls/apiSetComment'
import getMoreResponses from '../../../apiCalls/getMoreResponses'

const CommentCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  :first-child {
    margin-top: 0px;
  }
`
const CommentCard = styled.div`
  position: relative;
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 15px 30px 20px 15px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
`

const AvatarCont = styled.div`
  width: 80px;
  margin: 0 15px 0 0;
  @media (max-width: 700px) {
    margin: 0 10px 0 0;
    width: 40px;
  }
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
  }
  border-radius: 100%;

  background-size: cover;
  background-position: center center;
`

const CommentCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const UserInfo = styled.div`
  margin: 25px 0 25px 0;
  @media (max-width: 700px) {
    margin: 15px 0 15px 0;
  }
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  color: var(--orange);
  font-size: 24px;
  @media (max-width: 700px) {
    font-size: 18px;
  }
  font-weight: bold;
`
const CommentDate = styled.span`
  color: var(--blueDark);
  font-size: 14px;
  font-weight: 300;
  @media (max-width: 700px) {
    font-size: 12px;
  }
  margin: 0 0 0 5px;
`

const Text = styled.div`
  font-weight: 500;

  p {
    word-break: break-word;
  }
  p:first-child {
    margin-top: 0;
  }
  @media (max-width: 700px) {
    p {
      font-size: 14px;
    }
  }
`
const CommentFooter = styled.div`
  display: flex;
`
const SocialInteractions = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`
const Icon = styled.span`
  &:active svg {
    transform: scale(1.5);
  }
  svg {
    height: 30px;
    width: 30px;
    fill: #ff9575;
    margin: 0 8px;
    transform: ${props =>
      props.rotate === true ? 'rotate(180deg)' : 'rotate(0deg)'};

    &:hover {
      cursor: pointer;
    }
  }
`

const Counter = styled.span`
  color: #004059;
  font-weight: bold;
  font-size: 0.7rem;
  user-select: none;
`

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
`

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
`

const ReplyCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 15px 0 0 0;
  @media (max-width: 700px) {
    width: 90%;
  }
`

const Ellipsis = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  display: flex;
  width: 20px;
  justify-content: center;
  height: 40px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 700px) {
    right: 5vw;
  }
  svg {
    width: 4px;

    @media (max-width: 700px) {
      width: 3px;
    }
    fill: rgba(0, 0, 0, 0.61);
  }

  svg
`

const MiniModal = styled.ul`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 10px;
  box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  list-style-type: none;

  @media (max-width: 700px) {
    right: 5vw;
  }
  li {
    color: var(--blueDark);
    font-size: 14px;
  }

  li:hover {
    cursor: pointer;
  }

  li:first-child {
    margin-bottom: 5px;
  }
`

const CancelBtn = styled.button`
  color: black !important;
  background: transparent !important;
  :hover {
    color: white !important;
    background: var(--blueLigth) !important;
  }
`

const DeleteBtn = styled.button`
  color: white !important;
  background: var(--blueDark) !important;
  :hover {
    color: red !important;
    background: transparent !important;
  }
`

const EditBtn = styled.button`
  color: white !important;
  background: var(--blueDark) !important;
  :hover {
    color: red !important;
    background: transparent !important;
  }
`

const Comment = ({
  index,
  userAvatar,
  userName,
  date,
  replies,
  message,
  article,
  logInStatus,
  setCommentClaps,
  setComments
}) => {
  const [isReplyEditor, setReplyEditor] = useState(false)
  const [clapsAdder, setClapsAdder] = useState(0)
  const [clapsTimer, setClapsTimer] = useState()
  const [isModal, setModal] = useState(false)
  const [isDeleteClicked, setDeleteisClicked] = useState(false)
  const [isEditClicked, setEditClicked] = useState(false)
  const [editCommentMessage, setEditCommentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isUserLoggedIn = logInStatus.isUserLoggedIn

  let repliesMap
  if (replies) {
    repliesMap = replies.map((replyObj, i) => {
      const {userName, userAvatar, message, date} = replyObj
      return (
        <Reply
          key={i}
          commentIndex={index}
          index={i}
          userName={userName}
          userAvatar={userAvatar}
          message={message}
          date={dbDateToNormalDate(date)}
        />
      )
    })
  }

  const showModalHandler = () => {
    setModal(!isModal)
  }
  const replyHandler = () => {
    setReplyEditor(!isReplyEditor)
  }

  const clapsAdderHandler = () => {
    if (clapsTimer) {
      clearTimeout(clapsTimer)
    }
    setClapsAdder(clapsAdder + 1)

    const timer = setTimeout(async () => {
      setClapsAdder(0)

      console.log(
        'article.comments[index].claps',
        article.comments[index].claps
      )
      //api call
      const updatedCommentClaps = await updateCommentClaps(
        article.id,
        index,
        clapsAdder + 1
      )

      console.log('clapsAdderHandler updatedCommentClaps', updatedCommentClaps)

      if (updatedCommentClaps.status === 'OK') {
        setCommentClaps(index, updatedCommentClaps.result)
      }

      return
    }, 1000)
    setClapsTimer(timer)
  }

  const confirmDeletionHandler = () => {
    apiDeleteComment(article.comments[index]._id, () => {
      let commentsAfterDeletion = article.comments.filter(comment => {
        return comment !== article.comments[index]
      })

      setComments(commentsAfterDeletion)
      setDeleteisClicked(false)
    })
  }

  const deleteCommentHandler = async () => {
    setDeleteisClicked(true) //show modal
  }

  const editCommentHandler = () => {
    setEditClicked(true) //show modal
  }

  const editComment = value => {
    setEditCommentMessage(value)
  }
  const confirmEditionHandler = () => {
    apiSetComment(
      logInStatus.loggedUserID,
      logInStatus.loggedUserName,
      article.title,
      editCommentMessage,
      index,
      () => {
        setEditClicked(false)
        let comments = article.comments
        comments[index].message = editCommentMessage
        setComments(comments)
      }
    )
  }

  const moreResponsesHandler = async () => {
    setIsLoading(true)
    const responsesCount = article.comments[index].responses.length
    let comments = article.comments

    console.log(
      'moreResponsesHandler responsesCount  esperada 3',
      responsesCount
    )

    const getMoreResponsesRes = await getMoreResponses(
      article.id,
      index,
      responsesCount
    )

    if (getMoreResponsesRes.status === 'OK') {
      comments[index].responses = getMoreResponsesRes.responses
      setComments(comments)
    }
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      {isDeleteClicked && (
        <Modal
          title='Warning'
          body='Are You Sure?'
          modalTitleClass='modalTitle'
          modalHandler={() => {
            setDeleteisClicked(false)
          }}
        >
          <CancelBtn
            onClick={() => {
              setDeleteisClicked(false)
            }}
          >
            Cancel
          </CancelBtn>
          <DeleteBtn onClick={confirmDeletionHandler}>Delete</DeleteBtn>
        </Modal>
      )}

      {isEditClicked && (
        <Modal
          size='big'
          body={
            <NewComment
              preComment={article.comments[index].message}
              note={false}
              editComment={editComment}
            />
          }
          modalHandler={() => {
            setEditClicked(false)
          }}
        >
          <CancelBtn
            onClick={() => {
              setEditClicked(false)
            }}
          >
            Cancel
          </CancelBtn>
          <EditBtn
            onClick={() => {
              confirmEditionHandler()
              console.log('Edit it')
            }}
          >
            Edit
          </EditBtn>
        </Modal>
      )}

      <CommentCardLayout
        id='CommentCardLayout'
        onMouseLeave={() => {
          isModal && setModal(false)
        }}
        onClick={() => {
          isModal && setModal(false)
        }}
        onTouchMove={() => {
          isModal && setModal(false)
        }}
      >
        <CommentCard id='CommentCard'>
          {logInStatus.loggedUserName === userName &&
            article.comments[index].responses.length === 0 && (
              <Ellipsis onClick={showModalHandler}>{ellipsis}</Ellipsis>
            )}
          {isModal && (
            <MiniModal id='MiniModal'>
              <li onClick={deleteCommentHandler}>Delete</li>
              <li onClick={editCommentHandler}>Edit</li>
            </MiniModal>
          )}
          <AvatarCont id='AvatarCont'>
            <Avatar
              id=''
              style={{
                backgroundImage:
                  userAvatar && `url('${userAvatar}`.replace('big', 'small')
              }}
            />
          </AvatarCont>
          <CommentCont id='CommentCont'>
            <UserInfo id='UserInfo'>
              <UserName id='UserName'>{userName}</UserName>
              <CommentDate id='CommentDate'>
                {dbDateToNormalDate(date)}
              </CommentDate>
            </UserInfo>
            <Text>
              <ReactMarkdown source={message} />
            </Text>
            <CommentFooter id='CommentFooter'>
              <SocialInteractions id='SocialInteractions'>
                <Icon
                  id='Icon'
                  style={{position: 'relative'}}
                  onClick={() => {
                    clapsAdderHandler()
                  }}
                >
                  {clapsAdder !== 0 && (
                    <Counter
                      id='clapsAdderCounter'
                      style={{
                        position: 'absolute',
                        backgroundColor: '#004059',
                        color: 'white',
                        borderRadius: '100%',
                        padding: '7px',
                        top: '-30px'
                      }}
                    >
                      +{clapsAdder}
                    </Counter>
                  )}
                  {clapsIcon}
                </Icon>
                <Counter id='Counter'>
                  {article.comments[index].claps > 0 &&
                    article.comments[index].claps}
                </Counter>
              </SocialInteractions>
              {isUserLoggedIn && (
                <ReplyBtn id='ReplyBtn'>
                  <button onClick={replyHandler}>Reply</button>
                </ReplyBtn>
              )}
            </CommentFooter>
          </CommentCont>
        </CommentCard>

        {isReplyEditor && (
          <ReplyEditor
            id='ReplyEditor'
            setReplyEditor={isReply => {
              setReplyEditor(isReply)
            }}
            index={index}
          />
        )}
        {replies && <ReplyCardLayout>{repliesMap}</ReplyCardLayout>}
        {article.comments[index].responses.length <
          article.comments[index].responsesCount && (
          <MoreBtn onClick={moreResponsesHandler}>
            {isLoading ? <Loading /> : 'More...'}
          </MoreBtn>
        )}
      </CommentCardLayout>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    article: state.article,
    logInStatus: state.logInStatus
  }
}
const mapDispachToProps = dispach => {
  return {
    //acciones

    setCommentClaps: (index, count) =>
      dispach({type: 'SET_COMMENT_CLAPS', payload: {index, count}}),
    setComments: comments => dispach({type: 'SET_COMMENTS', payload: comments})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Comment)
