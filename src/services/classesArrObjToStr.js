const classesArrObjToStr = (classesArr, suffix) => {
  let resultStr = ''

  for (let i = 0; i < classesArr.length; i++) {
    let tempStr = ''
    tempStr = classesArr[i].name.replace(/\s/g, '-')

    tempStr = `.${tempStr}-${suffix} {\n`

    tempStr = `${tempStr}${classesArr[i].styles
      .replace(/\n/g, '')
      .replace(/;/g, ';\n')}}\n`
    resultStr = resultStr + tempStr
  }
  return resultStr
}

export default classesArrObjToStr
