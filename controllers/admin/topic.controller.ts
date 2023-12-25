import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";
// [GET] /admin/topic/
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });

  res.render("admin/pages/topic/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics,
  });
};

// [GET] /admin/topic/
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/topic/create", {
    pageTitle: "Thêm chủ đề",
  });
};

// [POST] /admin/topic/
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  if (req.body.avatar) {
    avatar = req.body.avatar;
  }
  const dataTopic = {
    title: req.body.title,
    status: req.body.status,
    avatar: avatar,
  };

  const topic = new Topic(dataTopic);
  await topic.save();
  req.flash("success","Thêm chủ đề thành công");
  res.redirect(`/${systemConfig.prefixAmin}/topics`);
};
