import Express from "express";
import passport from "passport";
import database_connect from "./db/database";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// access routes
import router from "./Routes/contact_message";
import Article_Route from "./Routes/Article_Route";
import Comment_Route from "./Routes/comment_route";
import User_roure from "./Routes/User_route";

import securerouter from "./Routes/secure-routes";

import Swaggerui from "swagger-ui-express";
import document from "./swagger";

const app = Express();
app.use(cors());
app.use(Express.json());

dotenv.config();

database_connect();
const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is running on port", port);
});
app.use(bodyParser.urlencoded({ extended: false }));
// let use route

// parse application/json
app.use(bodyParser.json());

// routes for Article
app.use("/api", Article_Route);

// all routes
app.use("/contact", router);
app.use("/api", Comment_Route);
app.use("/api", User_roure);
app.use("/admin", securerouter);
// secure route
app.use("/adm", User_roure);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// swagger
app.use("/swaggerapi-docs", Swaggerui.serve, Swaggerui.setup(document));

// Access-Control-Allow-Origin" for google oauth
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res) => {
  res.json({ success: "error", message: "route not found" });
});

export default app;
