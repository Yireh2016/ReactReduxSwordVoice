import nodemailer from "nodemailer";

const sendNoReplyEmail = (html, email) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = {
      user: "noreply@swordvoice.com",
      pass: "n0r3plyQq@."
    };

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "swordvoice.com",
      port: 587, //587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      },
      requireTLS: true,
      debug: true,
      logger: true
    });

    // send mail with defined transport object

    transporter.verify(function(error) {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    console.log("html", html); //TODO erase
    console.log("email", email); //TODO erase

    let info = await transporter.sendMail({
      from: '"Swordvoice" <noreply@swordvoice.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Welcome ✔", // Subject line
      html: `${html}` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(err => {
    console.log("error sending mail", err);
    res.status(404).json(err);
  });
};

export default sendNoReplyEmail;
