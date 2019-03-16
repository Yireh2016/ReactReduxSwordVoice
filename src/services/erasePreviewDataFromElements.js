const erasePreviewDataFromElements = elementsArr => {
  console.log("elementsArr", elementsArr);
  elementsArr.forEach(element => {
    if (element.imgFile) element.imgFile.previewURL = "";
  });
  console.log("elementsArr after erasing preview ", elementsArr);

  return elementsArr;
};

export default erasePreviewDataFromElements;
