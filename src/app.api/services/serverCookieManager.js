import Cookies from "cookies";
import uuid from "uuid/v1";
import { createToken } from "./tokenHandler";

export const sessionCookie = async (req, res, user) => {
  let userSessionId = uuid();

  let keys = [process.env.COOKEYS];
  let cookies = new Cookies(req, res, {
    keys: keys,
    maxAge: (1000 * 60 * 60 * 24 * 365) / 2
  });
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
  cookies.set("sessionID", token, {
    signed: true,
    overwrite: true
  });

  console.log("cookie setted");
  return;
};

export const guestCookie = (req, res) => {
  let guestID = uuid();

  let keys = [process.env.COOKEYS];
  let cookies = new Cookies(req, res, {
    keys: keys,
    maxAge: (1000 * 60 * 60 * 24 * 365) / 2
  });
  cookies.set("guestID", guestID, {
    signed: true,
    overwrite: true
  });

  return userSessionId;
};

export const deleteCookie = (req, res) => {
  let cookies = new Cookies(req, res);
  cookies.set("sessionID");
  cookies.set("sessionID.sig");
  return;
};
