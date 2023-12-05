import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";

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

//moment
app.locals.moment = moment;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
