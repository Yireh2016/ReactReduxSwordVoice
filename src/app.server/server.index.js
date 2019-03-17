import express from "express";
// import React from "react";
// import { Provider } from "react-redux";
// import mongoose from "mongoose";
// import { store, history } from "../app.redux.store/store/configStore";
// import { ConnectedRouter } from "connected-react-router";
import cookieParser from "cookie-parser";
require("dotenv").config();
// import { renderToString } from "react-dom/server";
// import { StaticRouter as Router } from "react-router-dom";
// import { CookiesProvider } from "react-cookie";
import morgan from "morgan";
import swordvoiceWeb from "../app.server/controllers/swordvoiceWeb";
import cms from "../app.server/controllers/cms";

// import App from "../app.client/app";
// import ScrollToTop from "../app.client/components/general/scrollToTop/scrollToTop.component";
// import template from "./template";
import passport from "passport"; //modulo debe estar declarado antes que los modelos
import "../app.api/models/db";
import "../app.api/config/passport"; //modulo debe estar importado despues de los modelos
import routerAPI from "../app.api/routes/api.index";

const server = express();

//middlewares
server.use(morgan("dev"));
server.use(express.json({ limit: "50mb", extended: true }));

server.use(cookieParser());

//static files
server.use(express.static("dist/assets"));
//Passport initializing for authentication
server.use(passport.initialize());

//routes
server.use("/api", routerAPI);
server.use("/cms", cms);
server.get("/*", swordvoiceWeb);

//starting server
server.listen(8080);
console.log("listening");
