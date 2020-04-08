import parseHTML2Object from './parseHTML2Object'
import html from 'htmlparser-to-html'

const getClassFromStrAddSuffix = (classes, suffix) => {
  let classesArr = classes.match(/[a-z][\w-]*/g)

  let tempStr = ''
  for (let j = 0; j < classesArr.length; j++) {
    classesArr[j] = classesArr[j].replace(
      `${classesArr[j]}`,
      `${classesArr[j]}-${suffix}`
    )

    tempStr = tempStr + `${classesArr[j]} `
  }

  return tempStr
}

const addSuffixToClassPropsOnDomArr = (arrHTMLparsed, suffix) => {
  for (let i = 0; i < arrHTMLparsed.length; i++) {
    if (
      arrHTMLparsed[i].attribs &&
      arrHTMLparsed[i].type === 'tag' &&
      arrHTMLparsed[i].attribs.class
    ) {
      arrHTMLparsed[i].attribs.class = getClassFromStrAddSuffix(
        arrHTMLparsed[i].attribs.class,
        suffix
      )
    }
    if (arrHTMLparsed[i].children) {
      addSuffixToClassPropsOnDomArr(arrHTMLparsed[i].children, suffix)
    }
  }
}

const addSuffixToCustomClasses = (word, suffix) => {
  let domObj = parseHTML2Object(word)

  addSuffixToClassPropsOnDomArr(domObj, suffix)

  return html(domObj)
}

export default addSuffixToCustomClasses
