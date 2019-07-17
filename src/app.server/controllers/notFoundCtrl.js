import React from "react";
import { renderToString } from "react-dom/server";
import NotFound from "../../app.client/components/notFound/notFound2";
import { StyleRoot } from "radium";

import notFoundtemplate from "../templates/notFoundtemplate";

const renderTemplate = req => {
  const appString = renderToString(
    <StyleRoot radiumConfig={{ userAgent: req.headers["user-agent"] }}>
      <NotFound />
    </StyleRoot>
  );
  return appString;
};

const notFoundCtrl = (req, res) => {
  res.status(404).send(
    notFoundtemplate({
      body: renderTemplate(req),
      title: "Not Found"
    })
  );
};

export default notFoundCtrl;
