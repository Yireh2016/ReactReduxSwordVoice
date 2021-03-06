import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {HashLink as Link} from 'react-router-hash-link'

//components
import ShareBtn from './shareBtn/ShareBtn'

//assets
import {
  claps as claps2,
  comments as comments2,
  share as share2,
  views as view2
} from '../../../../assets/svgIcons/SvgIcons'

//api calls

import updateSocialCount from '../../../../apiCalls/updateSocialCount'

//services
import countingHTMLwords from '../../../../services/countingHTMLwords'

const BarContainer = styled.div`
  display: inline-block;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  padding: 15px 15px 0 15px;
  margin: 15px 0 0 0;
  box-sizing: border-box;
`
const BarLayout = styled.div`
  display: flex;
  padding: 15px;
`
const SocialItem = styled.div`
  margin: 0 8px;
  display: inline-flex;
  align-items: center;
  @media (max-width: 700px) {
    margin: 0;
  }
`
const Icon = styled.span`
  display: flex;
  transform: ${props =>
    props.rotate === 'true' ? 'rotate(180deg)' : 'rotate(0deg)'};

  #clapsIcon {
    width: 50px;
    height: 50px;
  }

  &:active #clapsIcon {
    transform: scale(1.2);
  }
  svg {
    height: 20px;
    width: 20px;
    fill: #ff9575;
    margin: 0 8px;

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

const SocialBar = ({
  socialCount,
  addClapsCount,
  setShareCount,
  setViewsCount,
  article
}) => {
  const [clapsAdder, setClapsAdder] = useState(0)
  const [clapsTimer, setClapsTimer] = useState()
  const [showSocial, setShowSocial] = useState(false)
  useEffect(() => {
    const timerExpires = (countingHTMLwords(article.html) * 60 * 1000 * 2) / 3

    setTimeout(async () => {
      const updatedSocialCountRes = await updateSocialCount(
        article.id,
        'views',
        1
      )

      if (updatedSocialCountRes.status === 'OK') {
        setViewsCount(updatedSocialCountRes.result.views)
      }
    }, timerExpires)
  }, [])

  const clapsAdderHandler = () => {
    if (clapsTimer) {
      clearTimeout(clapsTimer)
    }
    setClapsAdder(clapsAdder + 1)

    const timer = setTimeout(async () => {
      setClapsAdder(0)

      //api call
      const updateSocialCountRes = await updateSocialCount(
        article.id,
        'claps',
        clapsAdder + 1
      )

      if (updateSocialCountRes.status === 'OK') {
        addClapsCount(updateSocialCountRes.result.claps)
      }
    }, 1000)
    setClapsTimer(timer)
  }

  const claps = (
    <Icon
      style={{position: 'relative'}}
      id='claps'
      onClick={() => {
        clapsAdderHandler()
      }}
    >
      {clapsAdder !== 0 && (
        <Counter
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
      {claps2}
    </Icon>
  )

  const share = (
    <Icon
      id='share'
      onClick={() => {
        setShowSocial(true)
      }}
    >
      {share2}
    </Icon>
  )
  const views = <Icon id='views'>{view2}</Icon>
  const comments = (
    <Link
      aria-label='go to comments section'
      scroll={el => el.scrollIntoView({behavior: 'smooth', block: 'start'})}
      to='#commentsSection'
    >
      <Icon id='comments'>{comments2}</Icon>
    </Link>
  )

  const socialItems = [
    {
      icon: claps,
      count: socialCount.claps
    },
    {
      icon: comments,
      count: socialCount.comments
    },
    {
      icon: share,
      count: socialCount.share.total
    },
    {
      icon: views,
      count: socialCount.views
    }
  ]

  const socialItemsMap = socialItems.map((socialItem, i) => {
    let count = socialItem.count

    if (socialItem.count >= 1000 && socialItem.count < 1000000) {
      count = `${Math.floor(socialItem.count / 1000)}K`
    } else if (socialItem.count >= 1000000) {
      count = `${Math.floor(socialItem.count / 1000000)}M`
    }
    return (
      <SocialItem key={i}>
        {socialItem.icon}
        <Counter>{count}</Counter>
      </SocialItem>
    )
  })

  const {
    linkedIn,
    email,
    copyLink,
    whatsapp,
    facebook,
    twitter
  } = article.socialCount.share

  const shareBtnOnClose = () => {
    setShowSocial(false)
  }

  const totalCountHandler = count => {
    setShareCount(count)
  }

  let hashtagsArr = []
  article.categories.map(category => {
    category = category.replace(' ', '')
    hashtagsArr.push(`${category}`)
  })
  return (
    <React.Fragment>
      {showSocial && (
        <ShareBtn
          linkedIn={linkedIn}
          email={email}
          copyLink={copyLink}
          whatsapp={whatsapp}
          facebook={facebook}
          twitter={twitter}
          onClose={shareBtnOnClose}
          totalCount={totalCountHandler}
          postData={{
            // url: `${process.env.WEB_URL + "/blog/post/" + article.url}`,
            url: `${'https://swordvoice.com' + '/blog/post/' + article.url}`,
            title: article.title,
            emailSubject: article.title,
            hashtag: hashtagsArr
          }}
        ></ShareBtn>
      )}
      <BarContainer id='barContainer'>
        <BarLayout id='barLayout'>{socialItemsMap}</BarLayout>
      </BarContainer>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    socialCount: state.article.socialCount,
    article: state.article
  }
}
const mapDispachToProps = dispatch => {
  return {
    addClapsCount: count => dispatch({type: 'ADD_CLAPS_COUNT', payload: count}),

    setShareCount: count => dispatch({type: 'SET_SHARE_COUNT', payload: count}),
    setViewsCount: count => dispatch({type: 'ADD_VIEWS_COUNT', payload: count})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(SocialBar)
