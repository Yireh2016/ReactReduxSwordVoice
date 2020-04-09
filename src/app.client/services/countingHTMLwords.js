const countingHTMLwords = htmlStr => {
  const newStr = htmlStr.replace(/<[^>]*>/g, ' ')
  const numberOfWords = newStr.split(' ').length
  const minutesToRead = numberOfWords / 200
  const minutesNormalize = Math.round(minutesToRead)

  return minutesNormalize
}

export default countingHTMLwords
