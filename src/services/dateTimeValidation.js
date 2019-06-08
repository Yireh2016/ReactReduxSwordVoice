const dateNormalize = (date, utc) => {
  if (utc) {
    console.log("dateNormalize date", date);

    date = date.setHours(date.getHours() + utc);
    date = new Date(date);
    console.log("dateNormalize date utc offset", date);
  }

  date = date.setMinutes(date.getMinutes() - date.getMinutes());
  date = new Date(date);
  date = date.setHours(date.getHours() - date.getHours());
  date = new Date(date);
  console.log("dateNormalize result", date);
  return date;
};

const dateOffsetCorrection = date => {
  const utc = date.getTimezoneOffset() / 60;
  date = date.setHours(date.getHours() + utc);
  date = new Date(date);
  return date;
};
const dateNormalizeStr = date => {
  date = dateNormalize(date);
  date = date.toISOString();
  return date.match(/\d{4}-\d{2}-\d{2}/)[0];
};

export const dateValidation = date => {
  let validateDate = new Date(date);
  validateDate = dateOffsetCorrection(validateDate);

  let now = new Date();
  const nowStr = dateNormalizeStr(now);
  now = dateNormalize(now);
  console.log(`now ${now} validateDate ${validateDate}`);
  return validateDate > now || nowStr === date;
};

export const timeValidation = time => {
  const timeValid = time.match(/\d{2}:\d{2}/);
  if (timeValid) {
    return true;
  }
  return false;
};

// // now.setHours(now.getHours() - now.getTimezoneOffset() / 60);
// // now = new Date(now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]);
// console.log(`dateValidation  now ${now}`);
// console.log(
//   `dateValidation  now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ${
//     now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
//   }`
// );

// // now = new Date(now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]);
// let validationDate = new Date(date.match(/\d{4}-\d{2}-\d{2}/)[0]);
// // validationDate.setHours(
// //   validationDate.getHours() - validationDate.getHours()
// // );
// validationDate.setHours(
//   validationDate.getHours() - validationDate.getTimezoneOffset() / 60
// );

// console.log(`dateValidation  validationDate ${validationDate}`);
// console.log(
//   `dateValidation  validationDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ${
//     validationDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
//   }`
// );

// // validationDate.setHours(
// //   validationDate.getHours() + validationDate.getTimezoneOffset() / 60
// // );

// console.log(`dateValidation validationDate ${validationDate} now ${now}`);
// console.log(
//   `dateValidation validationDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ${
//     validationDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
//   } now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ${
//     now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
//   }`
// );
// console.log(
//   `validationDate > now || now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] === validationDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]`,
//   validationDate > now ||
//     now.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ===
//       validationDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
// );
