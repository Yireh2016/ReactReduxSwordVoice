import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CopyLink from "./copyLink/CopyLink";

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  // TelegramShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  // PinterestShareButton,
  // VKShareButton,
  // OKShareButton,
  // RedditShareButton,
  // TumblrShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // ViberShareButton,
  // WorkplaceShareButton,
  // LineShareButton,
  // PocketShareButton,
  // InstapaperShareButton,
  EmailShareButton,
  EmailIcon
} from "react-share";

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  background-color: white;
`;

const ButtonCont = styled.div`
  display: flex;
  padding: 15px;
`;

const Title = styled.h4`
  text-align: center;
  padding: 30px 15px 0 15px;
`;

const Icon = styled.div`
  padding: 5px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    :focus {
      outline: none;
    }
  }

  > div {
    :hover {
      cursor: pointer;
    }
  }
`;

const Counter = styled.div`
  color: #004059;
  font-weight: bold;
  font-size: 0.7rem;
`;

// const postData = {
//   url: "https://swordvoice.com/blog/",
//   emailSubject: "Check this webpage https://swordvoice.com",
//   title: "The best article of all time!!!"
// };
const ShareBtn = ({
  onClose,
  twitter = 0,
  linkedIn = 0,
  email = 0,
  copyLink = 0,
  whatsapp = 0,
  facebook = 0,
  totalCount,
  postData
}) => {
  const [twitterCount, setTwitterCount] = useState(0);
  const [linkedInCount, setLinkedInCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [copyLinkCount, setCopyLinkCount] = useState(0);
  const [whatsappCount, setWhatsappCount] = useState(0);
  const [facebookCount, setFacebookCount] = useState(0);

  useEffect(() => {
    setTwitterCount(twitter);
    setLinkedInCount(linkedIn);
    setEmailCount(email);
    setCopyLinkCount(copyLink);
    setWhatsappCount(whatsapp);
    setFacebookCount(facebook);
  }, []);

  useEffect(() => {
    totalCount &&
      totalCount(
        twitterCount +
          linkedInCount +
          emailCount +
          copyLinkCount +
          whatsappCount
      );
  }, [twitterCount, linkedInCount, emailCount, copyLinkCount]);

  return (
    <Layout
      onClick={e => {
        onClose();
      }}
    >
      <Container
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Title>Social Share Control Room</Title>
        <ButtonCont>
          <Icon>
            <TwitterShareButton
              url={postData.url}
              title={postData.title}
              hashtags={postData.hashtag}
              via="SwordVoice_1"
              onShareWindowClose={() => {
                setTwitterCount(twitterCount + 1);
              }}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <Counter>{twitterCount}</Counter>
          </Icon>

          <Icon>
            <LinkedinShareButton
              url={postData.url}
              windowWidth={750}
              windowHeight={600}
              onShareWindowClose={() => {
                setLinkedInCount(linkedInCount + 1);
              }}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <Counter>{linkedInCount}</Counter>
          </Icon>

          <Icon>
            <FacebookShareButton
              url={postData.url}
              quote={postData.title}
              hashtag={`#${postData.hashtag[0]}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <FacebookShareCount url={postData.url}>
              {count => {
                setFacebookCount(count + facebookCount);
                return <Counter>{count + facebookCount}</Counter>;
              }}
            </FacebookShareCount>
          </Icon>

          <Icon>
            <EmailShareButton
              url={postData.url}
              subject={postData.emailSubject}
              beforeOnClick={() => {
                setEmailCount(emailCount + 1);
              }}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <Counter>{emailCount}</Counter>
          </Icon>

          <Icon>
            <WhatsappShareButton
              url={postData.url}
              subject={postData.emailSubject}
              onShareWindowClose={() => {
                setWhatsappCount(whatsappCount + 1);
              }}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <Counter>{whatsappCount}</Counter>
          </Icon>

          <Icon>
            <CopyLink
              url={postData.url}
              size={32}
              onClick={() => {
                setCopyLinkCount(copyLinkCount + 1);
              }}
            />
            <Counter>{copyLinkCount}</Counter>
          </Icon>
        </ButtonCont>
      </Container>
    </Layout>
  );
};

export default ShareBtn;
