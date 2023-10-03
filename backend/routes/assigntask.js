const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.get('/assigntask',async(req,res)=>{
    let data =await pool.query("SELECT firstname , role ,documents , id  FROM userinformation");
    res.json(data);
})

module.exports = router;