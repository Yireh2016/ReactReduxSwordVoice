const htmlArrCosolidation = arr => {
  let arrElements = arr;

  let finalHTMLElement = "";
  for (let i = 0; i < arrElements.length; i++) {
    finalHTMLElement = finalHTMLElement + "" + arrElements[i].finalHTMLElement;
  }
  return finalHTMLElement;
};

export default htmlArrCosolidation;
