import * as jwtEncrypt from "jwt-token-encrypt";

export const createToken = async (
  publicData,
  privateData,
  encryptOpt,
  jwtOpt
) => {
  // Data that will be publicly available

  // Data that will only be available to users who know encryption details.

  const { encryptKey, encryptAlgorithm } = encryptOpt;
  // Encryption settings
  const encryption = {
    key: encryptKey,
    algorithm: encryptAlgorithm
    // key: 'AAAAAAAAAAAAAA',
    // algorithm: 'aes-256-cbc',
  };

  const { secret, algorithm, expiresIn, notBefore, key } = jwtOpt;
  // JWT Settings
  const jwtDetails = {
    //secret: '1234567890', // to sign the token
    // Default values that will be automatically applied unless specified.
    // algorithm: 'HS256',
    // expiresIn: '12h',
    // notBefore: '0s',
    // Other optional values
    //key: 'ThisIsMyAppISS',// is used as ISS but can be named iss too
    secret,
    algorithm: algorithm ? algorithm : "HS256",
    expiresIn: expiresIn ? expiresIn : "12h",
    notBefore: notBefore ? notBefore : "0s",
    key: key && key
  };

  const token = await jwtEncrypt.generateJWT(
    jwtDetails,
    publicData,
    encryption,
    privateData
  );

  return token;
};

//  createToken;

export const readToken = (token, encryptOpt) => {
  const { encryptKey, encryptAlgorithm } = encryptOpt;

  const encryption = {
    key: encryptKey,
    algorithm: encryptAlgorithm
    // key: 'AAAAAAAAAAAAAA',
    // algorithm: 'aes-256-cbc',
  };

  const decrypted = jwtEncrypt.readJWT(token, encryption);
  return decrypted;
};
