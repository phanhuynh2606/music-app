"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database = __importStar(require("./config/database"));
const index_route_1 = __importDefault(require("./routes/client/index.route"));
const moment_1 = __importDefault(require("moment"));
const index_route_2 = __importDefault(require("./routes/admin/index.route"));
const config_1 = require("./config/config");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
database.connect();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)("_method"));
app.use(express_1.default.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
const sessionOptions = {
    secret: 'HJSHDJSJJASHDJ',
    cookie: { maxAge: 60000 }
};
app.use((0, cookie_parser_1.default)("HJSHDJSJJASHDJ"));
app.use((0, express_session_1.default)(sessionOptions));
app.use((0, express_flash_1.default)());
(0, index_route_1.default)(app);
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_modules", "tinymce")));
app.locals.prefixAdmin = config_1.systemConfig.prefixAmin;
(0, index_route_2.default)(app);
app.locals.moment = moment_1.default;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});