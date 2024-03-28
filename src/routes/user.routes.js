import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { createUser, uploadAvatar } from "../controllers/aboutuser.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/user-create").post(createUser)
router.route("/upload-image").post(upload.single("file"),uploadAvatar)

export default router;