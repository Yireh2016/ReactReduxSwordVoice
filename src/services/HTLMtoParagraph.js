const HTLMtoParagraph = htmlStr => {
  if (htmlStr) {
    console.log("htmlStr", htmlStr);

    htmlStr = htmlStr.replace(/<\/p>/gi, "\n");
    console.log("htmlStr", htmlStr);

    htmlStr = htmlStr.replace(/<p>/gi, "");
    console.log("htmlStr", htmlStr);
  }
  return htmlStr;
};

export default HTLMtoParagraph;
