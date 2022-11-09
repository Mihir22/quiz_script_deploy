//AUTHOR MIHIR MESIA
import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

//Api calls
router.get("/:id", async (req, res) => {
  const data = await db.fetchQuestions(req.params.id);
  res.send(JSON.stringify(data));
});

export default router;
