import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../index.css";

function UserDetails() {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    language: "",
    role: "",
  });
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get(`http://localhost:3008/userdetails/${id}`)
        .then((response) => {
          const data = response.data;
          setData({
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
            phone: data[0].phone,
            language: data[0].language,
            role: data[0].role,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getdata();
  });

  return <div class="modal-dialog modal-dialog-centered"></div>;
}

export default UserDetails;
