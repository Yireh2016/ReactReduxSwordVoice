const validatePassword = value => {
  if (
    value &&
    value.match(
      /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g
    )
  ) {
    return true
  }

  if (value.match(/^$/)) {
    return ' '
  }
  return false
}

export default validatePassword
