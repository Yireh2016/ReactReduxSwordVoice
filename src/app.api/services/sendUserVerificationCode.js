import verifyEmailTemplate from "../templates/verifyEmail";
import sendNoReplyEmail from "../services/sendNoReplyEmail";

const sendUserVerificationCode = async (code, user) => {
  const html = verifyEmailTemplate(code, user.firstName);

  try {
    return await sendNoReplyEmail(html, "Welcome ✔", user.email);
  } catch (err) {
    return err;
  }
};

export default sendUserVerificationCode;
