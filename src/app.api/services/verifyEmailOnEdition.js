import editEmailVerificationTemplate from "../templates/editEmailVerificationTemplate";
import sendNoReplyEmail from "../services/sendNoReplyEmail";

const sendUserVerificationCode = async (code, user) => {
  console.log("code", code); //TODO erase

  const html = editEmailVerificationTemplate(code, user.firstName);

  try {
    return await sendNoReplyEmail(html, "Email Verification 📧", user.email);
  } catch (err) {
    console.log("sendUserVerificationCode err", err); //TODO erase
    return err;
  }
};

export default sendUserVerificationCode;
