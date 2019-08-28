import cmsTemplate from "../templates/cmsTemplate";

const cms = (req, res) => {
  res.send(
    cmsTemplate({
      title: "SwordVoice.com | Dashboard"
    })
  );
};

export default cms;
