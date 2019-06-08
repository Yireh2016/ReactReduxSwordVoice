import express from "express";
import "@babel/polyfill"; //para que axios funcione en ie11
import passport from "passport"; //modulo debe estar declarado antes que los modelos
import cookieParser from "cookie-parser";
require("dotenv").config();
import morgan from "morgan";

//modelos para DB
import "../app.api/models/db";
import "../app.api/config/passport"; //modulo debe estar importado despues de los modelos

//controllers
import swordvoiceWeb from "../app.server/controllers/swordvoiceWeb";
import notFoundCtrl from "../app.server/controllers/notFoundCtrl";
import cms from "../app.server/controllers/cms";
import checkProgramPost from "./controllers/checkProgramPost";

//routes
import routerAPI from "../app.api/routes/api.index";

const server = express();

//middlewares
server.use(morgan("dev"));
server.use(express.json({ limit: "50mb", extended: true }));
server.use(cookieParser(process.env.COOKEYS));

//static files
server.use(express.static("dist/assets"));
//Passport initializing for authentication
server.use(passport.initialize());

//routes
server.use("/api", routerAPI);
server.use("/cms", cms);
server.get("/", swordvoiceWeb);
server.get("/home", swordvoiceWeb);
server.get("/about", swordvoiceWeb);
server.get("/contact", swordvoiceWeb);
server.get("/courses", swordvoiceWeb);
server.get("/portfolio", swordvoiceWeb);
server.get("/newBlog", swordvoiceWeb);
server.get("/blog", swordvoiceWeb);
server.get("/blog/post*", swordvoiceWeb);
server.get("*", notFoundCtrl);

checkProgramPost(1); //every minute

//starting server
server.listen(8080);
console.log("listening");
