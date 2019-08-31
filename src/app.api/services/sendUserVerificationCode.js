import verifyEmailTemplate from "../templates/verifyEmail";
import sendNoReplyEmail from "../services/sendNoReplyEmail";

const sendUserVerificationCode = (code, user) => {
  const html = verifyEmailTemplate(code, user.firstName);

  sendNoReplyEmail(html, user.email);
};

export default sendUserVerificationCode;
