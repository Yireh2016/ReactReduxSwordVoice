const emailHintConverter = email => {
  const fullLen = email.length;
  const uriLen = email.match(/(.*)@/)[0].length - 1;
  const domainLen = fullLen - 1 - uriLen;

  let uriStars = "";
  if (uriLen > 3) {
    for (let i = 0; i < uriLen - 3; i++) {
      uriStars = uriStars + "*";
    }
  }

  let domainStars = "";

  if (domainLen > 3) {
    for (let i = 0; i < domainLen - 3; i++) {
      domainStars = domainStars + "*";
    }
  }

  const uriHint =
    uriLen > 3 ? email.match(/(.{3}).*@/)[1] : email.match(/(.*)@/)[1];

  const domainHint =
    domainLen > 3 ? email.match(/.*@(.{3})/)[1] : email.match(/.*@(.*)/)[1];

  return `${uriHint}${uriStars}@${domainHint}${domainStars}`;
};

export default emailHintConverter;
