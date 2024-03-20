import { Router } from "express";
import { registerUser,uploadAvatar } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/upload-image").post(upload.single("file"),uploadAvatar)

export default router;