const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.get("/getuserdata", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM user_table  JOIN role ON user_table.role_id = role.role_id WHERE isactive= true"
  );
  console.log(result);
  res.json(result.rows);
});

module.exports = router;
