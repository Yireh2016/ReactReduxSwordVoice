const erasePreviewDataFromElements = elementsArr => {
  elementsArr.forEach(element => {
    if (element.imgFile) element.imgFile.previewURL = "";
  });

  return elementsArr;
};

export default erasePreviewDataFromElements;
