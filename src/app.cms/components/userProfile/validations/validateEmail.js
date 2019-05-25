const validateEmail = value => {
  if (value.match(/^$/)) {
    return " ";
  }
  if (
    !value ||
    !value.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    )
  ) {
    return false;
  }
  return true;
};
export default validateEmail;
