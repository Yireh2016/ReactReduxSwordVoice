import mongoose from "mongoose";

const visitorModel = mongoose.model("Visitor");

export const sendContactFormCtrl = (req, res) => {
  const { name, email, newsletter, message } = req.body;

  console.log("sending by nodemailer", message);

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

        let visitor = new visitorModel(visitorObj);

        visitor.save(err => {
          if (err) {
            console.log(
              `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
            );
            res.status(400).json({
              message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
            });
            return;
          }

          res.status(200).json({
            status: "OK",
            message: `${name}, your message has been sent. Thank you!!`
          });
        });

        return;
      } else if (visitorArr[0].visitorIsSubscriber !== newsletter) {
        console.log();
        visitorArr[0].visitorIsSubscriber = newsletter;

        visitorArr[0].save(err => {
          if (err) {
            console.log(
              `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
            );
            res.status(400).json({
              message: `ERROR FATAL ON DB when Saving DATA ...there was an error: ${err}`
            });
            return;
          }

          res.status(200).json({
            status: "OK",
            message: `${name}, your message has been sent. Thank you!!`
          });
        });
        return;
      }

      res.status(200).json({
        status: "OK",
        message: `${name}, your message has been sent. Thank you!!`
      });
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
