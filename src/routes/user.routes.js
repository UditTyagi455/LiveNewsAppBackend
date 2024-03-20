import { Router } from "express";
import { registerUser,topics,uploadAvatar,authors } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/upload-image").post(upload.single("file"),uploadAvatar)
router.route("/topics").get(topics)
router.route("/authors").get(authors)

export default router;