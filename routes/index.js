// Author: Harshit Gajjar

import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// Api calls
router.post("/login", async (req, res) => {
  const resp = await db.login(req?.body || {});
  // res.status(resp.code).send(resp.data);

  if (resp.code == 200) {
    req.session.user = resp.data[0].email;
    req.session.save();
  }
  res.send(JSON.stringify(resp));
});

router.get("/currentUser", (req, res) => {
  return res.send(req.session.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  db.closeConnection();
  return res.redirect("/")
});

//AUTHOR MIHIR MESIA
router.get("/getUser", (req,res)=> {
  res.json({'user':req.session.user})
})


export default router;
