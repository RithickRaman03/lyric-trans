const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.put("/editdata", async (req, res) => {
  const { Firstname, Lastname, email, phone, id } = req.body;
  console.log(req.body);
  let data = await pool.query(
    "UPDATE user_table SET  first_name=$1,last_name = $2, email = $3, phone_number = $4 WHERE id = $5",
    [Firstname, Lastname, email, phone, id]
  );
  res.json(data);
});
module.exports = router;
