import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
  grid-template-columns: calc(100% * 8 / 12) calc(100% * 4 / 12);
  grid-template-rows: 90px 580px auto auto auto;

  @media (max-width: 1050px) {
    grid-template-columns: calc(100% * 12 / 12);
    grid-template-rows:
      130px auto auto auto auto auto
      auto;
  }
  @media (max-width: 700px) {
    grid-template-rows:
      90px auto auto auto auto auto
      auto;
  }
`

const NavbarWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;

  grid-row-start: 1;
  grid-row-end: 2;

  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 1;
    grid-row-end: 2;
  }
`

const ArtcleCont = styled.section`
  grid-column-start: 1;
  grid-column-end: 2;

  grid-row-start: 2;
  grid-row-end: 4;

  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 2;
    grid-row-end: 3;
  }
`

const SimilPostCont = styled.section`
  grid-column-start: 2;
  grid-column-end: 3;

  grid-row-start: 3;
  grid-row-end: 4;

  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 3;
    grid-row-end: 4;
  }
`

const Footer = styled.footer`
  grid-column-start: 2;
  grid-column-end: 3;

  grid-row-start: 2;
  grid-row-end: 3;

  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 6;
    grid-row-end: 7;
  }
`

const CommentsCont = styled.section`
  grid-column-start: 1;
  grid-column-end: 2;

  grid-row-start: 4;
  grid-row-end: 5;

  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 4;
    grid-row-end: 5;
  }
`

const PopularPostsCont = styled.section`
  grid-column-start: 1;
  grid-column-end: 2;

  grid-row-start: 5;
  grid-row-end: 6;

  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 7;
    grid-row-end: 8;
  }
`

const VerticalAd = styled.section`
  grid-column-start: 2;
  grid-column-end: 3;

  grid-row-start: 4;
  grid-row-end: 6;
  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 2;

    grid-row-start: 5;
    grid-row-end: 6;
  }
`

const BlogPostLayout = ({
  article,
  ad1,
  similPost,
  comments,
  popPosts,
  ad2,
  footer
}) => {
  return (
    <Layout>
      <NavbarWrapper></NavbarWrapper>
      <ArtcleCont>
        {article}
        {ad1}
      </ArtcleCont>
      <Footer>{footer}</Footer>
      <SimilPostCont>{similPost}</SimilPostCont>

      <CommentsCont>{comments}</CommentsCont>

      <PopularPostsCont>{popPosts}</PopularPostsCont>
      <VerticalAd>{ad2}</VerticalAd>
    </Layout>
  )
}

export default BlogPostLayout
