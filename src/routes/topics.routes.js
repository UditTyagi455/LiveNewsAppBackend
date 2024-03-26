import { Router } from "express";
import { addTopics, getTopics,selectedTopics } from "../controllers/topic.controllers.js";

const router = Router();

router.route("/topic").get(getTopics)
router.route("/add-topic").post(addTopics)
router.route("/interested-topic").post(selectedTopics)

export default router;