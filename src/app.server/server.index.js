import express from "express";
import React from "react";
require("dotenv").config();
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import morgan from "morgan";

import App from "../app.client/app";
import template from "./template";
import passport from "passport"; //modulo debe estar declarado antes que los modelos
import "../app.api/models/db";
import "../app.api/config/passport"; //modulo debe estar importado despues de los modelos
import routerAPI from "../app.api/routes/api.index";

const server = express();

//middlewares
server.use(morgan("dev"));
server.use(express.json());

//static files
server.use(express.static("dist/assets"));
//Passport initializing for authentication
server.use(passport.initialize());

//routes
server.use("/api", routerAPI);

server.get("/*", (req, res) => {
  const isMobile = false;
  const context = {};
  const initialState = { isMobile };
  const appString = renderToString(
    <Router location={req.url} context={context}>
      <App {...initialState} />
    </Router>
  );

  res.send(
    template({
      body: appString,
      title: "Hello World from the server",
      initialState: JSON.stringify(initialState)
    })
  );
});

//starting server
server.listen(8080);
console.log("listening");
