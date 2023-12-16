import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
import adminRoute from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import bodyParse from "body-parser";
import path from "path";
import methodOverride from "method-override";
import flash from "express-flash";
import session,{SessionOptions} from "express-session";
import cookieParser from "cookie-parser";


dotenv.config();

database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// Body-parse: Để lấy được data 
app.use(bodyParse.urlencoded({extended : false}));

app.use(methodOverride("_method"));

app.use(express.static(`${__dirname}/public`));

// Setting PUG
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Flash
// Thêm secret vào tùy chọn session
const sessionOptions: SessionOptions = {
  secret: 'HJSHDJSJJASHDJ',  // Thay 'your-secret-key' bằng giá trị thực tế của bạn
  cookie: { maxAge: 60000 }
};
app.use(cookieParser("HJSHDJSJJASHDJ"));
app.use(session(sessionOptions));
app.use(flash());
// End Flash

//Routes Client
clientRoutes(app);

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// TinyMCE
// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAmin;

//Routes Admin
adminRoute(app);
//moment
app.locals.moment = moment;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
