
import { Response, Request } from "express";
import { filterStatus } from "../../helpers/filterStatus";
import { objectSearch } from "../../helpers/search";
import Singer from "../../models/singer.model";
import {systemConfig} from "../../config/config";
// [GET] /admin/singers/
export const list = async (req:Request, res : Response) => {
    const objectFilterStatus = filterStatus(req.query);
    const searchHelper = objectSearch(req.query);
    let find = {
        deleted : false
    }
    if(req.query.status){
        find["status"] = req.query.status;
    }
    if(searchHelper["regex"]){
        find["fullName"] = searchHelper["regex"];
    }

    const singers = await Singer.find(find);
    // console.log(singers);
    res.render("admin/pages/singer/index",{
        pageTitle : "Trang quản lý ca sĩ",
        filterStatus : objectFilterStatus,
        keyword : searchHelper.keyword,
        singers : singers
    });
}

// [GET] /admin/singers/create
export const create = async (req:Request, res : Response) => {
    res.render("admin/pages/singer/create",{
        pageTitle : "Trang thêm ca sĩ",
    });
}
// [POST] /admin/singers/create
export const createPost = async (req:Request, res : Response) => {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: avatar,
    };

    const singer = new Singer(dataSinger);
    await singer.save();
    req.flash("success", "Thêm ca sĩ thành công");
    res.redirect(`/${systemConfig.prefixAmin}/singers`);
}
// [GET] /admin/singers/edit/:singerId
export const edit = async (req:Request, res : Response) => {
    const singerId = req.params.singerId;

    const singer = await Singer.findOne({
        _id : singerId,
        deleted: false
    })
    res.render("admin/pages/singer/edit",{
        pageTitle : "Sửa thông tin ca sĩ",
        singer : singer
    });
}
// [PATCH] /admin/singers/edit/:singerId
export const editPatch = async (req:Request, res : Response) => {
    const singerId = req.params.singerId;
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
    };
    let avatar = "";
    if (req.body.avatar) {
        dataSinger["avatar"] = req.body.avatar;
    }
    
    await Singer.updateOne({
        _id : singerId
    },dataSinger);
    req.flash("success", "Sửa thông tin ca sĩ thành công");
    res.redirect("back");
}