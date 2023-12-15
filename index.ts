import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
import adminRoute from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";

dotenv.config();

database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.static("public"));

// Setting PUG
app.set("views", "./views");
app.set("view engine", "pug");

//Routes Client
clientRoutes(app);

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// TinyMCE
// App Local Variables
app.locals.prefixAmin = systemConfig.prefixAmin;

//Routes Admin
adminRoute(app);
//moment
app.locals.moment = moment;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
