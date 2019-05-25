const validateNames = value => {
  if (value && value.match(/^[a-zA-Zñáéíóú]+$/g)) {
    return true;
  }
  if (value.match(/^$/)) {
    setNameValid(" ");
    return " ";
  }
  return false;
};

export default validateNames;
