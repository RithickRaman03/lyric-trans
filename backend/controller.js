const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const deletedata = require("./routes/deletedata");
const editdata = require("./routes/editdata");
const getuserdata = require("./routes/getuserdata");
const userdata = require("./routes/userdata");
const userdetails = require("./routes/userdetails");
const getlanguage = require("./routes/getlanguage");
const getrole = require("./routes/getrole");

app.post("/userdata", userdata);
app.get("/getuserdata", getuserdata);
app.delete("/deletedata", deletedata);
app.put("/editdata", editdata);
app.get("/userdetails/:id", userdetails);
app.get("/getlanguage", getlanguage);
app.get("/getrole", getrole);

module.exports = app;
