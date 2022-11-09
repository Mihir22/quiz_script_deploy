import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

// Author: Harshit Gajjar
router.post("/sendMulQuizResults", async (req, res) => {
  const status = await db.sendMulQuizResult(req?.body || {});
  res.status(status).send();
});

//AUTHOR MIHIR MESIA
router.post("/sendSingleScore", async (req, res) => {
  const status = await db.sendScore(req?.body || {});
  res.send(req.body);
});
//AUTHOR MIHIR MESIA
router.get("/fetchSingleScore/:user", async (req, res) => {
  const data = await db.fetchSingleScore(req.params.user);
  res.send(JSON.stringify(data));
});

// Author: Harshit Gajjar
router.get("/getMulQuizResults/:username", async (req, res) => {
  const resp = await db.getQuizResult(req?.params?.username || "");
  res.send({ data: resp.data });
});

//AUTHOR MIHIR MESIA
router.get("/fetchMulScore/:user", async (req, res) => {
  const resp = await db.fetchMulScore(req?.params?.user || "");
  res.send(JSON.stringify(resp));
});

export default router;
