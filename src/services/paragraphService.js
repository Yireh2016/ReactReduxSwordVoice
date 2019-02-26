const paragraphService = str => {
  let arr = str.match(/.*[^\n]/g);
  let result = "";
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      result = result + `<p>${arr[i]}</p>`;
    }
  }
  return result;
};

export default paragraphService;
