import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal.js";

function Adduser() {
  const [ckpwd, setckpwd] = useState(false);
  const [data, setData] = useState({
    Firstname: null,
    Lastname: null,
    Email: null,
    Phone: null,
    Password: null,
    Reenter: null,
    Language: null,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    function validatePassword(password) {
      // Password pattern: 8 characters, at least one uppercase letter, one special character, and one digit
      var passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).{8,}$/;
      return passwordPattern.test(password);
    }
    if (!validatePassword(data.Password)) {
      alert("Invalid ");
      return;
    }

    axios({
      method: "POST",
      url: "http://localhost:3008/userdata",
      data: data,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
    if (name === "Reenter") {
      if (value !== data.Password) {
        setckpwd(true);
      } else setckpwd(false);
    }
  };
  return (
    <div className="App">
      <div className="topbar"></div>
      <form>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-fullscreen-sm-down modal-dialog modal-xl modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <div className="topmodal">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Add a new user{" "}
                </h1>
              </div>
              <div class="modal-body ">
                <div className="wholecontent">
                  <div className="userinformation">
                    <h5>USER INFORMATION</h5>
                  </div>

                  <div className="thebox">
                    <div className="firstrow">
                      <div className="Firstname">
                        <label htmlFor="Firstname">Firstname</label>
                        <input
                          type="text"
                          id="name"
                          value={data.Firstname}
                          name="Firstname"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <br />
                      <div className="Email">
                        <label htmlFor="name">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={data.Email}
                          name="Email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <br />
                      <div className="Password">
                        <label htmlFor="Password">Password</label>
                        <input
                          type="password"
                          value={data.Password}
                          name="Password"
                          onChange={handleChange}
                        />
                      </div>
                      <br />
                      <div className="Language">
                        <label htmlFor="Language">Language</label>
                        <input
                          type="text"
                          id="Language"
                          value={data.Language}
                          name="Language"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="secondrow">
                      <div className="Lastname">
                        <label htmlFor="Lastname">Lastname</label>
                        <input
                          type="text"
                          id="name"
                          value={data.Lastname}
                          name="Lastname"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <br />
                      <div className="Phone">
                        <label htmlFor="Phone">Phone &nbsp;</label>
                        <input
                          type="tel"
                          id="Phone"
                          value={data.Phone}
                          name="Phone"
                          onChange={handleChange}
                          pattern="[789][0-9]{9}"
                          required
                        />
                      </div>
                      <br />
                      <div className="Reenterpassword">
                        <label htmlFor="Password">
                          Confirm Password &nbsp;{" "}
                        </label>

                        <input
                          type="password"
                          name="Reenter"
                          value={data.Reenter}
                          onChange={handleChange}
                        />
                        {ckpwd && <p>Password doesn't match</p>}
                      </div>
                    </div>
                  </div>

                  <div className="Submit">
                    <button
                      type="submit"
                      className="btn btn-primary sub-but"
                      onClick={handleSubmit}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        type="submit"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        adduser
      </button>
    </div>
  );
}

export default Adduser;
