const HTLMtoParagraph = htmlStr => {
  if (htmlStr) {
    htmlStr = htmlStr.replace(/<\/p>/gi, "\n");

    htmlStr = htmlStr.replace(/<p>/gi, "");
  }
  return htmlStr;
};

export default HTLMtoParagraph;
