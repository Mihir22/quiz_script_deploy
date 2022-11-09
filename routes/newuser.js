// Author: Harshit Gajjar

import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

// Api calls
router.post("/createUser", async (req, res) => {
  const status = await db.createUser(req?.body || {});
  if (status == 200) {
    req.session.user = req.body.email;
  }
  res.status(status).send();
});

router.delete("/deleteUser/:user", async (req, res) => {
  const status = await db.deleteUser(req?.params?.user || {});
  req.session.destroy();
  res.status(status).send({ code: status });
});


router.delete("/deleteRecords/:user", async (req, res) => {
  const status = await db.deleteRecords(req?.params?.user || {});
  res.status(status).send({ code: status });
});


export default router;
