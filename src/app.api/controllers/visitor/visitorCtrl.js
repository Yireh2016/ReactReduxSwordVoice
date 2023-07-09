import mongoose from 'mongoose'

//services
import sendNoReplyEmail from '../../services/sendNoReplyEmail'

//email Templates
import confirmNewsletterTemplate from '../../templates/confirmNewsletterTemplate'

const visitorModel = mongoose.model('Visitor')

export const sendContactFormCtrl = async (req, res) => {
  const {name, email, newsletter, message} = req.body

  console.log('sending by nodemailer', message)

  const sendContactEmail = async (
    {visitorName, visitorEmail, message, visitorIsSubscriber},
    successFn,
    errFn
  ) => {
    let sendEmailRes
    try {
      sendEmailRes = await sendNoReplyEmail(
        `<p>Name:${visitorName}</p> <p> email: ${visitorEmail}</p> <p>isSubscriber:${visitorIsSubscriber} </p>
        <p>Message:${message}</p>`,
        `Message from contact form`,
        'jainer@swordvoice.com'
      )
    } catch (error) {
      errFn(error)
      return
    }

    if (sendEmailRes === 'Message sent') {
      successFn({
        status: 'OK',
        message: `${name}, your message has been sent. Thank you!!`
      })
    } else {
      errFn(error)
    }
  }

  const sendConfirmationEmail = async ({
    name,
    email,
    id,
    sendContactEmailRes
  }) => {
    let sendEmailRes
    try {
      sendEmailRes = await sendNoReplyEmail(
        confirmNewsletterTemplate({name, id}),
        'SwordVoice.com Newsletter confirmation',
        email
      )
    } catch (error) {
      res.status(400).json({
        message: `ERROR FATAL ON sending message ...there was an error: ${error}`
      })
      return
    }

    if (sendEmailRes === 'Message sent') {
      res.status(200).json(sendContactEmailRes)
    } else {
      res.status(400).json({
        message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      })
    }
  }

  try {
    //Looking if visitors email exist
    const visitorArr = await visitorModel.find({visitorEmail: email}).exec()

    //Not exist Saving new visitor email
    if (visitorArr.length === 0) {
      let visitorObj = {
        visitorName: name,
        visitorEmail: email,
        visitorIsSubscriber: newsletter
      }

      let visitor = new visitorModel(visitorObj)
      if (newsletter) {
        try {
          await visitor.save()

          visitorObj.message = message
          sendContactEmail(
            visitorObj,
            sendContactEmailRes => {
              sendConfirmationEmail({
                email,
                name,
                id: visitorArr[0]._id,
                sendContactEmailRes
              })
            },
            err => {
              res.status(404).json({
                message: `ERROR FATAL Message not sent: ${err}`
              })
            }
          )
        } catch (err) {
          console.log(
            `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
          )
          res.status(404).json({
            message: `ERROR FATAL Message not sent: ${err}`
          })
        }
        return
      }

      try {
        await visitor.save()
        visitorObj.message = message
        sendContactEmail(
          visitorObj,
          () => {
            res.status(200).json({
              status: 'OK',
              message: `${name}, your message has been sent. Thank you!!`
            })
          },
          err => {
            res.status(404).json({
              message: `ERROR FATAL Message not sent: ${err}`
            })
          }
        )
      } catch (err) {
        console.log(
          `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
        )
        res.status(404).json({
          message: `ERROR FATAL Message not sent: ${err}`
        })
      }
      return
    }

    //visitor already exist
    if (!newsletter) {
      //if email was unsubscribe
      try {
        await visitorArr[0].remove()
      } catch (err) {
        console.log(
          `ERROR FATAL ON DB when removing DATA ...there was an error: ${err}`
        )
      }

      sendContactEmail(
        visitorObj,
        res.status(200).json({
          status: 'OK',
          message: `${name}, your message has been sent. Thank you!!`
        }),
        err => {
          res.status(404).json({
            message: `ERROR FATAL Message not sent: ${err}`
          })
        }
      )

      return
    }
    //sending email to existing email
    let visitorObj = {
      visitorName: name,
      visitorEmail: email,
      visitorIsSubscriber: newsletter,
      message: message
    }

    if (!visitorArr[0].visitorIsConfirm) {
      sendContactEmail(
        visitorObj,
        sendContactEmailRes => {
          sendConfirmationEmail({
            email,
            name,
            id: visitorArr[0]._id,
            sendContactEmailRes
          })
        },
        err => {
          res.status(404).json({
            message: `ERROR FATAL Message not sent: ${err}`
          })
        }
      )

      return
    }

    sendContactEmail(
      visitorObj,
      () => {
        res.status(200).json({
          status: 'OK',
          message: `${name}, your message has been sent. Thank you!!`
        })
      },
      err => {
        res.status(404).json({
          message: `ERROR FATAL Message not sent: ${err}`
        })
      }
    )
    return
  } catch (err) {
    console.log(
      `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
    )
    res.status(400).json({
      message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
    })
  }
}

export const emailNewsVerificationCtrl = async (req, res) => {
  const {id} = req.query

  const [visitor] = await visitorModel.find({_id: id})

  try {
    if (!visitor) {
      throw new Error()
    }

    visitor.visitorIsConfirm = true
    await visitor.save()

    res.status(200).send('Your email was successfully verified ')
    return
  } catch (err) {
    res.status(401).send('There was an error. Please try again later')
    return
  }
}
