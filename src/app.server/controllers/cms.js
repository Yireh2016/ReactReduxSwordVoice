import cmsTemplate from '../templates/cmsTemplate'
import {guestCookie} from '../../app.api/services/serverCookieManager'

const cms = (req, res) => {
  if (!req.signedCookies.guestID) {
    guestCookie(req, res)
  }

  res.send(
    cmsTemplate({
      title: 'SwordVoice.com | Dashboard'
    })
  )
}

export default cms
