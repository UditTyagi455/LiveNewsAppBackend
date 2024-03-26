import { Router } from "express";
import { registerUser,uploadAvatar,authors } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/upload-image").post(upload.single("file"),uploadAvatar)
router.route("/authors").get(authors)

export default router;