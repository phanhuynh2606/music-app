"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.list = void 0;
const filterStatus_1 = require("../../helpers/filterStatus");
const search_1 = require("../../helpers/search");
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectFilterStatus = (0, filterStatus_1.filterStatus)(req.query);
    const searchHelper = (0, search_1.objectSearch)(req.query);
    let find = {
        deleted: false
    };
    if (req.query.status) {
        find["status"] = req.query.status;
    }
    if (searchHelper["regex"]) {
        find["fullName"] = searchHelper["regex"];
    }
    const singers = yield singer_model_1.default.find(find);
    res.render("admin/pages/singer/index", {
        pageTitle: "Trang quản lý ca sĩ",
        filterStatus: objectFilterStatus,
        keyword: searchHelper.keyword,
        singers: singers
    });
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singer/create", {
        pageTitle: "Trang thêm ca sĩ",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: avatar,
    };
    const singer = new singer_model_1.default(dataSinger);
    yield singer.save();
    req.flash("success", "Thêm ca sĩ thành công");
    res.redirect(`/${config_1.systemConfig.prefixAmin}/singers`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.singerId;
    const singer = yield singer_model_1.default.findOne({
        _id: singerId,
        deleted: false
    });
    res.render("admin/pages/singer/edit", {
        pageTitle: "Sửa thông tin ca sĩ",
        singer: singer
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.singerId;
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
    };
    let avatar = "";
    if (req.body.avatar) {
        dataSinger["avatar"] = req.body.avatar;
    }
    yield singer_model_1.default.updateOne({
        _id: singerId
    }, dataSinger);
    req.flash("success", "Sửa thông tin ca sĩ thành công");
    res.redirect("back");
});
exports.editPatch = editPatch;
