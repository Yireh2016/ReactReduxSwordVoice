import React from 'react'
import styled from 'styled-components'

const SocialNetLayout = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #f95f0b;
  border: 1px solid var(--orange);
  box-sizing: border-box;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-decoration: none;
  color: white;
  font-size: 0.6rem;
  padding: 50px 30px;
  border-radius: 18px;

  @media (max-width: 1050px) {
    padding: 0;
    background: rgba(0, 23, 31, 0.7);
  }

  @media (max-width: 700px) {
    border-radius: 0px;
  }
`

const SocialNetSvg = styled.svg`
  fill: coral;
  width: 50px;

  :hover {
    fill: coral;
  }
  @media (max-width: 700px) {
    width: 10vw;
  }
`

const LinkLay = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;

  @media (max-width: 1050px) {
    flex-direction: row;
    padding: 20px 30px;
  }
`

const LinkCont = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;

  :first-child {
    margin-top: 0px;
  }

  @media (max-width: 1050px) {
    margin-top: 0px;
    margin-left: 50px;
    :first-child {
      margin: 0px;
    }
  }
`

const SVGLink = styled.a`
  a {
    :first-child {
      margin-top: 0px;
    }
  }
`

const SocialNetTitle = styled.a`
  text-decoration: none;

  h3 {
    font-family: 'Work Sans', sans-serif;
    font-size: 24px;
    margin-left: 15px;
    color: coral;
    outline: none;
  }

  @media (max-width: 1050px) {
    display: none;
  }
`

const SocialNet = () => {
  return (
    <SocialNetLayout id='SocialNetLayout'>
      <LinkLay id='LinkLay'>
        <LinkCont id='LinkContyoutube'>
          <SVGLink
            aria-label='go and subscribe to our youtube channel'
            id='SVGLinkyoutube'
            href='https://www.youtube.com/channel/UCle-HTb2TPvcVk0AaljQyOQ'
            rel='noopener'
            target='_blank'
          >
            <SocialNetSvg
              id='youtubeSocial'
              className='redesSociales '
              viewBox='0 0 45.505981 32.264583'
            >
              <g
                style={{
                  transform: 'translate(0.13229166px,0.13229166px)'
                }}
              >
                <path
                  className='bordeAnim '
                  d='M 44.296,5.00692 C 43.7757,3.03608 42.2427,1.48392 40.2962,0.957167 36.7681,0 22.6207,0 22.6207,0 22.6207,0 8.47339,0 4.94518,0.957167 2.9987,1.484 1.46568,3.03608 0.945362,5.00692 0,8.57917 0,16.0323 0,16.0323 c 0,0 0,7.4532 0.945362,11.0255 C 1.46568,29.0286 2.9987,30.5161 4.94518,31.0428 8.47339,32 22.6207,32 22.6207,32 c 0,0 14.1473,0 17.6755,-0.9572 1.9465,-0.5267 3.4795,-2.0142 3.9998,-3.985 0.9454,-3.5723 0.9454,-11.0255 0.9454,-11.0255 0,0 0,-7.45313 -0.9454,-11.02538 z M 17.9937,22.7993 V 9.26542 l 11.8244,6.76708 z'
                />
              </g>
            </SocialNetSvg>
          </SVGLink>
          <SocialNetTitle
            id='SocialNetTitleyoutube'
            href='https://www.youtube.com/channel/UCle-HTb2TPvcVk0AaljQyOQ'
            rel='noopener'
            target='_blank'
          >
            <h3>@SwordVoice</h3>
          </SocialNetTitle>
        </LinkCont>
        <LinkCont id='LinkContfacebook'>
          <SVGLink
            id='SVGLinkfacebook'
            href='https://www.facebook.com/SwordVoice/'
            rel='noopener'
            target='_blank'
          >
            <SocialNetSvg
              aria-label='go and follow us on facebook'
              id='facebookSocial'
              className='redesSociales '
              viewBox='0 0 39.840301 32.264583'
            >
              <g
                style={{
                  transform: 'translate(0.07157455px,0.13229166px)'
                }}
              >
                <path
                  className='bordeAnim '
                  d='M 16.435421,32 V 17.6875 H 11.641668 V 12 h 4.793753 V 7.51875 C 16.435421,2.65 19.410422,0 23.754174,0 c 2.0813,0 3.8687,0.15625 4.3875,0.225 v 5.0875 h -3.0125 c -2.3625,0 -2.8188,1.125 -2.8188,2.76875 V 12 h 5.3313 l -0.7312,5.6875 h -4.6001 V 32 Z'
                />
              </g>
            </SocialNetSvg>
          </SVGLink>

          <SocialNetTitle
            id='SocialNetTitlefacebook'
            href='https://www.facebook.com/SwordVoice/'
            rel='noopener'
            target='_blank'
          >
            <h3>@SwordVoice</h3>
          </SocialNetTitle>
        </LinkCont>
        <LinkCont id='LinkConttwitter'>
          <SVGLink
            aria-label='go and follow us on twitter'
            id='SVGLinktwitter'
            href='https://twitter.com/SwordVoice_1'
            rel='noopener'
            target='_blank'
          >
            <SocialNetSvg
              id='twitterSocial'
              className='redesSociales '
              viewBox='0 0 39.840301 32.264583'
            >
              <g
                style={{
                  transform: 'translate(0.07157455px,0.13229166px)'
                }}
              >
                <path
                  className='bordeAnim '
                  d='M 35.35,7.97497 C 35.375,8.32495 35.375,8.67501 35.375,9.025 35.375,19.6999 27.2501,32 12.4,32 7.82499,32 3.57502,30.6749 0,28.375 c 0.650024,0.075 1.27496,0.1 1.94999,0.1 3.77495,0 7.25,-1.275 10.02501,-3.45 -3.55001,-0.075 -6.52502,-2.4 -7.55004,-5.6 0.50005,0.0749 1.00001,0.125 1.52506,0.125 0.72498,0 1.45003,-0.1001 2.12499,-0.275 -3.69999,-0.7501 -6.47508,-4 -6.47508,-7.925 v -0.1 C 2.67489,11.85 3.925,12.225 5.2499,12.275 3.0749,10.8249 1.64995,8.34996 1.64995,5.54994 c 0,-1.49997 0.39993,-2.87497 1.09997,-4.07498 3.97502,4.9 9.95008,8.09995 16.64998,8.45 -0.125,-0.6 -0.2,-1.22494 -0.2,-1.84995 0,-4.45005 3.6,-8.07501 8.075,-8.07501 2.325,0 4.425,0.974998 5.9,2.55 1.825,-0.34998 3.575,-1.02502 5.125,-1.949996 -0.6,1.875046 -1.875,3.450046 -3.55,4.449976 1.625,-0.17492 3.2,-0.62502 4.65,-1.24995 C 38.3001,5.39996 36.925,6.8249 35.35,7.97497 Z'
                  style={{
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'miter',
                    strokeOpacity: '1'
                  }}
                />
              </g>
            </SocialNetSvg>
          </SVGLink>
          <SocialNetTitle
            id='SocialNetTitletwitter'
            href='https://twitter.com/SwordVoice_1'
            rel='noopener'
            target='_blank'
          >
            <h3>@SwordVoice_1</h3>
          </SocialNetTitle>
        </LinkCont>
        <LinkCont id='LinkContinstagram'>
          <SVGLink
            aria-label='go and follow us on instagram'
            id='SVGLinkinstagram'
            href='https://www.instagram.com/swordvoice_official/'
            rel='noopener'
            target='_blank'
          >
            <SocialNetSvg
              id='instagramSocial'
              className='redesSociales '
              style={{marginRight: '0'}}
              viewBox='0 0 32.272556 32.26543'
            >
              <g
                style={{
                  transform: 'translate(-61.064024px,-102.11608px)'
                }}
              >
                <path
                  className='bordeAnim '
                  d='m 77.203838,110.0444 c -4.5413,0 -8.20436,3.6631 -8.20436,8.2044 0,4.5413 3.66306,8.2044 8.20436,8.2044 4.541403,0 8.204403,-3.6631 8.204403,-8.2044 0,-4.5413 -3.663,-8.2044 -8.204403,-8.2044 z m 0,13.5383 c -2.9347,0 -5.3339,-2.392 -5.3339,-5.3339 0,-2.9419 2.3921,-5.3339 5.3339,-5.3339 2.941903,0 5.334003,2.392 5.334003,5.3339 0,2.9419 -2.3992,5.3339 -5.334003,5.3339 z m 10.453703,-13.8739 c 0,1.06393 -0.8569,1.91365 -1.9137,1.91365 -1.0639,0 -1.9136,-0.85686 -1.9136,-1.91365 0,-1.05679 0.8569,-1.91364 1.9136,-1.91364 1.0568,0 1.9137,0.85685 1.9137,1.91364 z m 5.4339,1.94221 c -0.1214,-2.56343 -0.7069,-4.8341 -2.5849,-6.7049 -1.8708,-1.8708 -4.1414,-2.45632 -6.7049,-2.58485 -2.6419,-0.14995 -10.560703,-0.14995 -13.202693,0 -2.55629,0.12139 -4.82696,0.70691 -6.7049,2.57771 -1.877941,1.8708 -2.456319,4.14147 -2.584848,6.7049 -0.149949,2.64193 -0.149949,10.56073 0,13.20273 0.121388,2.5634 0.706907,4.8341 2.584848,6.7049 1.87794,1.8708 4.14147,2.4563 6.7049,2.5848 2.64199,0.15 10.560793,0.15 13.202693,0 2.5635,-0.1214 4.8341,-0.7069 6.7049,-2.5848 1.8708,-1.8708 2.4564,-4.1415 2.5849,-6.7049 0.1499,-2.642 0.1499,-10.5536 0,-13.19559 z m -3.4132,16.03039 c -0.5569,1.3995 -1.6351,2.4777 -3.0418,3.0418 -2.1064,0.8354 -7.104803,0.6426 -9.432603,0.6426 -2.3278,0 -7.33322,0.1857 -9.43252,-0.6426 -1.39953,-0.557 -2.47774,-1.6352 -3.04183,-3.0418 -0.83544,-2.1065 -0.64265,-7.1048 -0.64265,-9.4326 0,-2.3278 -0.18565,-7.33326 0.64265,-9.43256 0.55695,-1.39953 1.63516,-2.47774 3.04183,-3.04183 2.10644,-0.83544 7.10472,-0.64265 9.43252,-0.64265 2.3278,0 7.333303,-0.18565 9.432603,0.64265 1.3995,0.55695 2.4777,1.63516 3.0418,3.04183 0.8355,2.10644 0.6427,7.10476 0.6427,9.43256 0,2.3278 0.1928,7.3333 -0.6427,9.4326 z'
                  style={{
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'miter',
                    strokeOpacity: '1'
                  }}
                />
              </g>
            </SocialNetSvg>
          </SVGLink>
          <SocialNetTitle
            id='SocialNetTitleinstagram'
            href='https://www.instagram.com/swordvoice_official/'
            rel='noopener'
            target='_blank'
          >
            <h3>@SwordVoice_Official</h3>
          </SocialNetTitle>
        </LinkCont>
      </LinkLay>
    </SocialNetLayout>
  )
}

export default SocialNet
