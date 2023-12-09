const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.post("/userdata", async (req, res) => {
  try {
    const { Firstname, Lastname, Email, Phone, Password, Language, Role } =
      req.body;
    console.log(req.body);

    const update = async () => {
      await pool.query(
        "INSERT INTO user_table (first_name,last_name,email,phone_number,password,language_id,isactive,role_id) VALUES ($1,$2,$3,$4,$5,$6,true,$7)",
        [Firstname, Lastname, Email, Phone, Password, Language, Role]
      );
      res.status(200).json("updated");
      console.log(update);
    };
    function validateEmail(Email) {
      var emailPattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.com$/;
      return emailPattern.test(Email);
    }
    function validatePhone(phone) {
      var phonePattern = /^\d{10}$/;
      return phonePattern.test(phone);
    }
    //      //validate phone number
    if (!validatePhone(Phone)) {
      return res.status(400).json({ message: "invalid phone" });
      //update()
    }
    //validate email
    if (!validateEmail(Email)) {
      return res.status(400).json({ message: "invalid email" });
      // update()
    }
    // both
    if (validatePhone(Phone) && validateEmail(Email)) {
      update();
    }
  } catch (err) {
    res.status(400).json("Invalid user info");
  }
});
module.exports = router;
