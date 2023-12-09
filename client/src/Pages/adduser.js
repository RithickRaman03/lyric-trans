import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Modal,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
  const [open, setOpen] = useState(false);
  const [ckpwd, setckpwd] = useState(false);
  const [data, setData] = useState({
    Firstname: null,
    Lastname: null,
    Email: null,
    Phone: null,
    Password: null,
    Role: null,
    Reenter: null,
    Language: null,
  });

  const [language, setLanguage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [role, setRole] = useState([]);
  const [selectedrole, setSelectedrole] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidFields, setInvalidFields] = useState({
    Firstname: false,
    Lastname: false,
    Email: false,
    Phone: false,
    Password: false,
    Reenter: false,
    Language: false,
    Role: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3008/getlanguage")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setLanguage(res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios
      .get("http://localhost:3008/getrole")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setRole(res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    function validatePassword(password) {
      var passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).{8,}$/;
      return passwordPattern.test(password);
    }

    const fieldsToCheck = [
      "Firstname",
      "Lastname",
      "Email",
      "Phone",
      "Password",
      "Reenter",
      "Language",
      "Role",
    ];

    const newInvalidFields = {};

    fieldsToCheck.forEach((field) => {
      if (!data[field]) {
        newInvalidFields[field] = true;
      } else {
        newInvalidFields[field] = false;
      }
    });

    for (const [value] of Object.entries(data)) {
      if (value) {
        toast.error("Please fill all fields!", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
      }
    }

    setInvalidFields(newInvalidFields);
    console.log(newInvalidFields);

    // Validate password
    if (!validatePassword(data.Password)) {
      setInvalidPassword(true);
      return;
    }

    // Check if any field is invalid
    if (Object.values(newInvalidFields).some((value) => value)) {
      return;
    }

    axios
      .post("http://localhost:3008/userdata", data)
      .then((response) => {
        setOpen(false);
        if (response.status === 200) {
          toast.success("USER ADDED", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "green",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "Reenter" && value !== data.Password) {
      setckpwd(true);
    } else {
      setckpwd(false);
    }
  };
  const handleLanguageChange = (e) => {
    const selectedLanguageId = e.target.value;
    setSelectedLanguage(selectedLanguageId);
    setData((prevData) => ({
      ...prevData,
      Language: selectedLanguageId,
    }));
  };

  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setSelectedrole(selectedRoleId);
    setData((prevData) => ({
      ...prevData,
      Role: selectedRoleId,
    }));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 470,
    bgcolor: "white",
    p: 4,
    "& .MuiTextField-root": {
      margin: "10px 0",
      width: "70%",
      borderColor: "red",
    },

    "& .MuiFormControl-root": {
      margin: "10px 0",
    },
  };
  const validstyle = {
    color: "red",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginLeft: "15px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            ADD NEW USER
          </Typography>
          <Box className="addcontent">
            <Box sx={validstyle} className="add1row">
              <TextField
                label="Firstname"
                type="text"
                id="name"
                value={data.Firstname}
                name="Firstname"
                onChange={handleChange}
                required
                error={invalidFields.Firstname}
              />
              <TextField
                label="Email"
                type="email"
                id="email"
                value={data.Email}
                name="Email"
                onChange={handleChange}
                required
                error={invalidFields.Email}
              />

              <FormControl fullWidth>
                <InputLabel id="language-label" style={{ width: "400%" }}>
                  Language
                </InputLabel>
                <Select
                  labelId="language-label"
                  id="Language"
                  name="Language"
                  label="Language"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  error={invalidFields.Language}
                >
                  <MenuItem value="">Select a language</MenuItem>
                  {language.map((lang, index) => (
                    <MenuItem key={index} value={lang.language_id}>
                      {lang.language_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Password"
                type="password"
                value={data.Password}
                name="Password"
                onChange={handleChange}
                error={invalidFields.Password}
              />
            </Box>

            <Box className="secondrow">
              <TextField
                label="Lastname"
                type="text"
                id="name"
                value={data.Lastname}
                name="Lastname"
                onChange={handleChange}
                required
                error={invalidFields.Lastname}
              />
              <TextField
                label="Phone"
                type="tel"
                id="Phone"
                value={data.Phone}
                name="Phone"
                onChange={handleChange}
                pattern="[789][0-9]{9}"
                required
                error={invalidFields.Phone}
              />

              <FormControl fullWidth>
                <InputLabel id="role-label" style={{ width: "400%" }}>
                  Role
                </InputLabel>
                <Select
                  labelId="language-label"
                  id="Role"
                  name="Role"
                  label="Role"
                  value={selectedrole}
                  onChange={handleRoleChange}
                  error={invalidFields.Role}
                >
                  <MenuItem value="">Select a language</MenuItem>
                  {role.map((role, index) => (
                    <MenuItem key={index} value={role.role_id}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Confirm Password"
                type="password"
                name="Reenter"
                value={data.Reenter}
                onChange={handleChange}
                error={invalidFields.Reenter}
              />
              {ckpwd && <Typography>Password doesn't match</Typography>}
            </Box>
          </Box>

          <Box className="Submit">
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: "red", color: "white" }}
            >
              ADD
            </Button>
            <br></br>
            <Button
              sx={{ backgroundColor: "transparent", color: "orange" }}
              type="submit"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddUser;
