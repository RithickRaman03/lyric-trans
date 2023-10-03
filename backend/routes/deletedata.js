const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.delete("/deletedata", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  await pool.query("UPDATE  user_table SET isactive = FALSE WHERE id=$1", [id]);
  res.json("datadeleted");
});
module.exports = router;
