const removeSuffixClasses = (classes, suffix) => {
  const regexSuffix = new RegExp(`-${suffix}`, "g");

  classes = classes.replace(regexSuffix, ""); //remove suffix

  let result = [];
  let classesNameMatchArr = classes.match(/\.[a-z][a-zA-Z0-9-]*/g); //get classes names on array

  let stylesMatchArr = classes.match(/\.[a-z][a-zA-Z0-9-]*\s*?{\n?.[^}]*}/g); //get styles  on array

  for (let i = 0; i < classesNameMatchArr.length; i++) {
    classesNameMatchArr[i];

    result[i] = {
      name: classesNameMatchArr[i].replace(".", ""),
      styles: stylesMatchArr[i]
        .replace(classesNameMatchArr[i], "")
        .replace("{\n", "")
        .replace("}", "")
    };
  }

  return result;
};
export default removeSuffixClasses;
