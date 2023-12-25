import {Router} from 'express';
import multer from "multer";

const upload = multer();
const router : Router = Router();
import * as uploadToCloudinary from "../../middlewares/admin/uploadCloud.middleware";

import * as controller from "../../controllers/admin/topic.controller";
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",upload.single("avatar") ,uploadToCloudinary.uploadSingle,controller.createPost);

export const topicRoutes :Router = router;