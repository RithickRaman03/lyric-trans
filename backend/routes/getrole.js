const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/getrole", async (req, res) => {
  try {
    const result = await pool.query("SELECT role_name, role_id FROM role");

    const languageArray = result.rows.map((item) => {
      return {
        role_name: item.role_name,
        role_id: item.role_id,
      };
    });

    res.send(languageArray);
  } catch (error) {
    console.error("Error getting languages:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
