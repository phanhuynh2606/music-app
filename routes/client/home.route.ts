import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/home.controller";

router.get("/", controller.index);
router.get("/login", controller.login);
router.get("/register", controller.register);

export const homeRoutes: Router = router;
