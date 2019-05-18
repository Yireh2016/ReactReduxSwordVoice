import React from "react";
import { renderToString } from "react-dom/server";
import NotFound from "../../app.client/components/notFound/notFound2";
import { StyleRoot } from "radium";

import template from "../templates/template";

const renderTemplate = req => {
  const appString = renderToString(
    <StyleRoot radiumConfig={{ userAgent: req.headers["user-agent"] }}>
      <NotFound />
    </StyleRoot>
  );
  return appString;
};

const notFoundCtrl = (req, res) => {
  res.send(
    template({
      body: renderTemplate(req),
      title: "Not Found"
    }),
    404
  );
};

export default notFoundCtrl;
