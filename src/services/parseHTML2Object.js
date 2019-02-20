import htmlparser from "htmlparser";

const parseHTML2Object = htmlStr => {
  let handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error) console.log("error", error);
    else {
      console.log("parser no error");
    }
  });
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(htmlStr);
  return handler.dom;
};

export default parseHTML2Object;
