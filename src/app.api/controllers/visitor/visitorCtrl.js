import mongoose from "mongoose";

//services
import sendNoReplyEmail from "../../services/sendNoReplyEmail";

//email Templates
import confirmNewletterTemplate from "../../templates/confirmNewletterTemplate";

const visitorModel = mongoose.model("Visitor");

export const sendContactFormCtrl = (req, res) => {
  const { name, email, newsletter, message } = req.body;

  console.log("sending by nodemailer", message);

  const sendContactEmail = async (
    { visitorName, visitorEmail, message, visitorIsSubscriber },
    successFn,
    errFn
  ) => {
    let sendEmailRes;
    try {
      sendEmailRes = await sendNoReplyEmail(
        `<p>Name:${visitorName}</p> <p> email: ${visitorEmail}</p> <p>isSubscriber:${visitorIsSubscriber} </p>
        <p>Message:${message}</p>`,
        `Message from contact form`,
        "jainer@swordvoice.com"
      );
    } catch (error) {
      errFn(error);
      return;
    }

    if (sendEmailRes === "Message sent") {
      successFn({
        status: "OK",
        message: `${name}, your message has been sent. Thank you!!`
      });
    } else {
      errFn(error);
    }
  };

  const sendConfirmationEmail = async ({
    name,
    email,
    id,
    sendContactEmailRes
  }) => {
    let sendEmailRes;
    try {
      sendEmailRes = await sendNoReplyEmail(
        confirmNewletterTemplate({ name, id }),
        "SwordVoice.com Newsletter confirmation",
        email
      );
    } catch (error) {
      res.status(400).json({
        message: `ERROR FATAL ON sending message ...there was an error: ${error}`
      });
      return;
    }

    if (sendEmailRes === "Message sent") {
      res.status(200).json(sendContactEmailRes);
    } else {
      res.status(400).json({
        message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      });
    }
  };
  //Lokiing if visitors email exist
  visitorModel
    .find({ visitorEmail: email })
    .exec()
    .then(visitorArr => {
      //Not exist Saving new visitor email
      if (visitorArr.length === 0) {
        let visitorObj = {
          visitorName: name,
          visitorEmail: email,
          visitorIsSubscriber: newsletter
        };

        let visitor = new visitorModel(visitorObj);
        if (newsletter) {
          visitor.save(err => {
            if (err) {
              console.log(
                `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
              );
              res.status(404).json({
                message: `ERROR FATAL Message not sent: ${err}`
              });
              return;
            }

            visitorObj.message = message;
            sendContactEmail(
              visitorObj,
              sendContactEmailRes => {
                sendConfirmationEmail({
                  email,
                  name,
                  id: visitorArr[0]._id,
                  sendContactEmailRes
                });
              },
              err => {
                res.status(404).json({
                  message: `ERROR FATAL Message not sent: ${err}`
                });
              }
            );
          });
        } else {
          visitor.save(err => {
            if (err) {
              console.log(
                `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
              );
              res.status(404).json({
                message: `ERROR FATAL Message not sent: ${err}`
              });
              return;
            }

            visitorObj.message = message;
            sendContactEmail(
              visitorObj,
              () => {
                res.status(200).json({
                  status: "OK",
                  message: `${name}, your message has been sent. Thank you!!`
                });
              },
              err => {
                res.status(404).json({
                  message: `ERROR FATAL Message not sent: ${err}`
                });
              }
            );
          });
        }

        return;
      } else {
        //visitor already exist
        if (!newsletter) {
          //if email was unsubscribe
          visitorArr[0].remove(err => {
            if (err) {
              console.log(
                `ERROR FATAL ON DB when removing DATA ...there was an error: ${err}`
              );
            }
          });

          sendContactEmail(
            visitorObj,
            res.status(200).json({
              status: "OK",
              message: `${name}, your message has been sent. Thank you!!`
            }),
            err => {
              res.status(404).json({
                message: `ERROR FATAL Message not sent: ${err}`
              });
            }
          );

          return;
        }
        //sending email to existing email
        let visitorObj = {
          visitorName: name,
          visitorEmail: email,
          visitorIsSubscriber: newsletter,
          message: message
        };

        if (!visitorArr[0].visitorIsConfirm) {
          sendContactEmail(
            visitorObj,
            sendContactEmailRes => {
              sendConfirmationEmail({
                email,
                name,
                id: visitorArr[0]._id,
                sendContactEmailRes
              });
            },
            err => {
              res.status(404).json({
                message: `ERROR FATAL Message not sent: ${err}`
              });
            }
          );
        } else {
          sendContactEmail(
            visitorObj,
            () => {
              res.status(200).json({
                status: "OK",
                message: `${name}, your message has been sent. Thank you!!`
              });
            },
            err => {
              res.status(404).json({
                message: `ERROR FATAL Message not sent: ${err}`
              });
            }
          );
        }
        return;
      }
    })
    .catch(err => {
      console.log(
        `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      );
      res.status(400).json({
        message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
      });
    });
};

export const emailNewsVerificationCtrl = (req, res) => {
  const { id } = req.query;

  visitorModel.find({ _id: id }).then(visitorArr => {
    visitorArr[0].visitorIsConfirm = true;

    visitorArr[0].save(err => {
      if (err) {
        res.status(401).send("There was an error. Please try again later");
        return;
      }

      res.status(200).send("Your email was successfully verified ");
      return;
    });
  });
};
