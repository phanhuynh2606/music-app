"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectSearch = void 0;
const objectSearch = (query) => {
    let objectSearch = {
        keyword: "",
    };
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch["regex"] = regex;
    }
    return objectSearch;
};
exports.objectSearch = objectSearch;
