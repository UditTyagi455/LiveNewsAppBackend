import { Router } from "express";
import { addTopics, getTopics } from "../controllers/topic.controllers.js";

const router = Router();

router.route("/topic").get(getTopics)
router.route("/add-topic").post(addTopics)

export default router;