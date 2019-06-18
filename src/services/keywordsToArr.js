let keywordsToArr = keywords => {
  if (!keywords) {
    return;
  }

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
    arr[i] = arr[i].replace(",", "");
  }

  arr = arr.filter(el => {
    return el !== "";
  });
  return arr;
};

export default keywordsToArr;
