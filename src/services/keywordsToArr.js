let keywordsToArr = keywords => {
  if (
    keywords.slice(keywords.length - 1, keywords.length) !== "," &&
    keywords !== ""
  ) {
    keywords = keywords + ",";
  }
  let arr =
    keywords.match(/([^,])*,/g) === null ? [] : keywords.match(/([^,])*,/g);

  let arrLen = arr.length;

  for (let i = 0; i < arrLen; i++) {
    arr[i] = arr[i].substring(0, arr[i].length - 1);
  }

  return arr;
};

export default keywordsToArr;
