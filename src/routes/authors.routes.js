import { Router } from "express";
import { addAuthors,followAuthors,getAuthors } from "../controllers/author.contollers.js";

const router = Router();

router.route("/add-author").post(addAuthors);
router.route("/get-author").get(getAuthors);
router.route("/follow-author").post(followAuthors)

export default router;