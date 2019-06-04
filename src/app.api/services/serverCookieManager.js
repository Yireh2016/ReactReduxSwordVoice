import { createToken } from "./tokenHandler";

export const sessionCookie = async (req, res, user) => {
  let userSessionId = 1;

  console.log("creating token");
  const token = await createToken(
    {},
    {
      username: user.username,
      id: user.id,
      sessionID: userSessionId
    },
    {
      encryptKey: `${process.env.ENCRYPTKEY}`,
      encryptAlgorithm: "aes-256-cbc"
    },
    { secret: `${process.env.JWTSECRET}`, expiresIn: `${24 * 365}h` }
  );
  console.log("created token and seting cookie", token);
  res.cookie("sessionID", token, {
    signed: true,
    httpOnly: true,
    maxAge: (1000 * 60 * 60 * 24 * 365) / 2
  });

  console.log("cookie setted");
  return;
};

export const guestCookie = (req, res) => {
  let guestID = uuid();

  res.cookie("guestID", guestID, {
    signed: true,
    httpOnly: true,
    maxAge: (1000 * 60 * 60 * 24 * 365) / 2
  });

  return;
};

export const deleteCookie = (req, res) => {
  res.clearCookie("sessionID");

  return;
};