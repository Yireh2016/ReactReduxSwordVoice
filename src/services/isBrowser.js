import is from "is_js";
const isBrowser = () => {
  let result;
  if (is.chrome()) {
    console.log("explorador es chorme", is.chrome());
    result = "chrome";
    return result;
  }

  if (is.edge()) {
    console.log("explorador es edge", is.edge());
    result = "edge";
    return result;
  }

  if (is.ie()) {
    console.log("explorador es ie", is.ie());
    result = "ie";
    return result;
  }

  if (is.firefox()) {
    console.log("explorador es firefox", is.firefox());
    result = "firefox";
    return result;
  }

  return result;
};

export default isBrowser;
