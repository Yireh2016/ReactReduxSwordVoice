import editEmailVerificationTemplate from "../templates/editEmailVerificationTemplate";
import sendNoReplyEmail from "../services/sendNoReplyEmail";

const sendUserVerificationCode = async (code, user) => {
  const html = editEmailVerificationTemplate(code, user.firstName);

  try {
    return await sendNoReplyEmail(html, "Email Verification 📧", user.email);
  } catch (err) {
    return err;
  }
};

export default sendUserVerificationCode;
