const dateNormalize = (date, utc) => {
  if (utc) {
    date = date.setHours(date.getHours() + utc)
    date = new Date(date)
  }

  date = date.setMinutes(date.getMinutes() - date.getMinutes())
  date = new Date(date)
  date = date.setHours(date.getHours() - date.getHours())
  date = new Date(date)
  return date
}

const dateOffsetCorrection = date => {
  const utc = date.getTimezoneOffset() / 60
  date = date.setHours(date.getHours() + utc)
  date = new Date(date)
  return date
}
const dateNormalizeStr = date => {
  date = dateNormalize(date)
  date = date.toISOString()
  return date.match(/\d{4}-\d{2}-\d{2}/)[0]
}

export const dateValidation = date => {
  let validateDate = new Date(date)
  validateDate = dateOffsetCorrection(validateDate)

  let now = new Date()
  const nowStr = dateNormalizeStr(now)
  now = dateNormalize(now)
  return validateDate > now || nowStr === date
}

export const timeValidation = time => {
  const timeValid = time.match(/\d{2}:\d{2}/)
  if (timeValid) {
    return true
  }
  return false
}
