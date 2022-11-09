//AUTHOR MIHIR MESIA

import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

//Api calls

router.get("/", async (req, res) => {
  const data = await db.fetchCategories();

  res.send(JSON.stringify(data));
});

router.post("/createCategories", async (req, res) => {
  const cat = db.createCategories(req?.body || {});
  res.send({ data: "works" });
});

// Api to send questions to mongodb database
router.post("/postQuestions", async (req, res) => {
  const cat = db.createQuestions(req?.body || {});
  res.send({ data: "works" });
});

// Api to get questions from mongodb database for a given category
router.get("/getQuestions/:category", async (req, res) => {
  const cat = await db.getQuestions(req?.params?.category || "");
  res.send({ code: cat.code, data: cat.data });
});

export default router;
