const responsiveImages = imgFile => {
  if (!imgFile) {
    return {
      tablet: '',
      mobile: ''
    }
  }
  const matchArr = imgFile.match(/\/([\w\s-]+\.\w{3,4})$/m)
  const replaceStr = matchArr[1]
  const tablet = replaceStr.replace('.', '_tablet.')
  const mobile = replaceStr.replace('.', '_mobile.')

  return {
    tablet: imgFile.replace(replaceStr, tablet),
    mobile: imgFile.replace(replaceStr, mobile)
  }
}

export default responsiveImages
