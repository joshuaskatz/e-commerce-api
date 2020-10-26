import express from "express";
import { isAuth } from "../middleware/isAuth";
// import { isAdmin } from "../middleware/isAdmin";

import * as userController from "../controllers/users";

const router: express.Router = express.Router();

//Should admin only see users?
router.get("/getUsers", isAuth, /*isAdmin,*/ userController.getUsers);
router.get("/getUser/:username", isAuth, userController.getUser);
router.get("/getMe", isAuth, userController.getMe);

export default router;
