import cmsTemplate from "../templates/cmsTemplate";

const cms = (req, res) => {
  res.send(
    cmsTemplate({
      title: "Hello World from the CMS"
    })
  );
  console.log("Hello from CMS");
};

export default cms;
