import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//services
import countingHTMLwords from "../../../../services/countingHTMLwords";

const Container = styled.div`
  padding: 15px;
`;

const Layout = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background-image: ${props => `url(${props.avatar})`};
  background-position: center center;
  background-size: cover;
  border-radius: 100%;
`;

const DescriptionCont = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  color: #004059;
  text-align: right;
  padding: 0 0 0 10px;
`;

const Author = styled.span`
  font-weight: bold;
`;

const ReadTime = styled.span`
  color: coral;
  font-weight: bold;
`;

const DescriptionCard = ({ article }) => {
  const [authorAvatar, setAuthorAvatar] = useState("");

  useEffect(() => {
    setAuthorAvatar(article.avatar.replace("_big.", "_small."));
  }, []);

  return (
    <Container id="articleDescriptionCard">
      <Layout>
        <Avatar avatar={authorAvatar} />
        <DescriptionCont>
          <Author>{article.author}</Author>
          <span>{article.date}</span>
          <ReadTime>{countingHTMLwords(article.html)} minutes read</ReadTime>
        </DescriptionCont>
      </Layout>
    </Container>
  );
};

const mapStateToProps2 = state => {
  return {
    article: state.article
  };
};

export default connect(mapStateToProps2)(DescriptionCard);
