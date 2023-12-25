"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.index = void 0;
const index = (req, res) => {
    res.render("client/pages/home/index", {
        pageTitle: "Trang Chủ"
    });
};
exports.index = index;
const login = (req, res) => {
    res.render("client/pages/home/login", {
        pageTitle: "Trang đăng nhập"
    });
};
exports.login = login;
const register = (req, res) => {
    res.render("client/pages/home/register", {
        pageTitle: "Trang đăng ký"
    });
};
exports.register = register;
