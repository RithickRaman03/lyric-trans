const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.get("/userdetails/:id", async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM user_table WHERE id=$1", [id]);
  res.json(result.rows);
  // console.log(id);
});
module.exports = router;
