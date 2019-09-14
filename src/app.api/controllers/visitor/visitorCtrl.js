import mongoose from "mongoose";

//services
import sendNoReplyEmail from "../../services/sendNoReplyEmail";

const visitorModel = mongoose.model("Visitor");

export const sendContactFormCtrl = (req, res) => {
  const { name, email, newsletter, message } = req.body;

  console.log("sending by nodemailer", message);

  const sendContactEmail = async ({
    visitorName,
    visitorEmail,
    message,
    visitorIsSubscriber
  }) => {
    let sendEmailRes;
    try {
      sendEmailRes = await sendNoReplyEmail(
        `<p>Name:${visitorName}</p> <p> email: ${visitorEmail}</p> <p>isSubscriber:${visitorIsSubscriber} </p>
        <p>Message:${message}</p>`,
        `Message from contact form`,
        "jainer@swordvoice.com"
      );
    } catch (error) {
      res.status(400).json({
        message: `ERROR FATAL ON sending message ...there was an error: ${error}`
      });
      return;
    }

    if (sendEmailRes === "Message sent") {
      res.status(200).json({
        status: "OK",
        message: `${name}, your message has been sent. Thank you!!`
      });
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
      //Saving new visitor email
      if (visitorArr.length === 0) {
        let visitorObj = {
          visitorName: name,
          visitorEmail: email,
          visitorIsSubscriber: newsletter
        };

        if (newsletter) {
          let visitor = new visitorModel(visitorObj);

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
          });
        }
        visitorObj.message = message;
        sendContactEmail(visitorObj);

        return;
      } else {
        if (!newsletter) {
          visitorArr[0].remove(err => {
            if (err) {
              console.log(
                `ERROR FATAL ON DB when removing DATA ...there was an error: ${err}`
              );
            }
          });
        }

        let visitorObj = {
          visitorName: name,
          visitorEmail: email,
          visitorIsSubscriber: newsletter,
          message: message
        };
        sendContactEmail(visitorObj);

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
