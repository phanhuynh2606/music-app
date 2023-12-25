import {Router} from 'express';
import multer from "multer"
const router : Router = Router();

const upload = multer();

import * as controller from "../../controllers/admin/singer.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

router.get("/", controller.list);
router.get("/create", controller.create);
router.post("/create",upload.single("avatar") ,uploadCloud.uploadSingle,controller.createPost);
router.get("/edit/:singerId", controller.edit);
router.patch("/edit/:singerId",upload.single("avatar") ,uploadCloud.uploadSingle,controller.editPatch);

export const sinngerRoute :Router = router;