const validateInterest = value => {
  if (value.match(/^[a-zA-Zñáéíóú0-9 ,]+$/g)) {
    return true
  }

  if (value.match(/^$/)) {
    return ' '
  }

  return false
}
export default validateInterest
