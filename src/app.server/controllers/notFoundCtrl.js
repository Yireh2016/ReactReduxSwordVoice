import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import NotFound from "../../app.client/components/notFound/notFound2";

import notFoundtemplate from "../templates/notFoundtemplate";

const renderTemplate = () => {
  const sheet = new ServerStyleSheet();

  try {
    var html = renderToString(sheet.collectStyles(<NotFound></NotFound>));
    var styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
  } catch (error) {
    // handle error
  } finally {
    sheet.seal();
  }

  return { html, styleTags };
};

const notFoundCtrl = (req, res) => {
  const renderObj = renderTemplate();

  res.status(404).send(
    notFoundtemplate({
      body: renderObj.html,
      styleTags: renderObj.styleTags,
      title: "SwordVoice.com | Not Found"
    })
  );
};

export default notFoundCtrl;
