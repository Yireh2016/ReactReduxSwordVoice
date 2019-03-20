import express from "express";
import passport from "passport"; //modulo debe estar declarado antes que los modelos
import cookieParser from "cookie-parser";
require("dotenv").config();
import morgan from "morgan";

//controllers
import swordvoiceWeb from "../app.server/controllers/swordvoiceWeb";
import cms from "../app.server/controllers/cms";

//modelos para DB
import "../app.api/models/db";
import "../app.api/config/passport"; //modulo debe estar importado despues de los modelos

//routes
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
