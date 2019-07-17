import cmsTemplate from "../templates/cmsTemplate";

const cms = (req, res) => {
  res.send(
    cmsTemplate({
      title: "Hello World from the CMS"
    })
  );
  // let directory = __dirname;
  // directory = directory.replace("server", "\\dist\\assets\\indexCMS.html");
  // console.log("directory", directory);
  // res.sendFile(directory);
};

export default cms;
