import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentsContext } from "../context/information";
import { Alert, Button, TextField } from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function StudentAdd() {
  const { students, setStudents } = useContext(StudentsContext);

  const [values, setValues] = useState({
    name: "",
    description: "",
    tags: "",
    subjects: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const navigate = useNavigate();

  const addStudent = (event) => {
    event.preventDefault();
    setMessage("");
    setSuccessful(false);
    const student = students.find((student) => student.name === values.name);
    if (student) {
      setMessage("Student already exists");
      setSuccessful(false);
      return;
    }
    const emailStudent = students.find((student) => student.email === values.email);
    if (emailStudent) {
      setMessage("The email is already in the list");
      setSuccessful(false);
      return;
    }

    if (
      values.name === "" ||
      values.email === "" ||
      values.tags === "" ||
      values.subjects === "" ||
      values.description === ""
    ) {
      setMessage("Please fill all the fields");
      setSuccessful(false);
      return;
    }

    setStudents((prevStudents) => [
      ...prevStudents,
      {
        name: values.name,
        description: values.description,
        tags: values.tags.split(","),
        subjects: values.subjects.split(","),
        email: values.email,
        number: prevStudents.length + 1,
        image: "",
      },
    ]);
    setMessage("Student added successfully");
    setSuccessful(true);
  };

  return (
    <div className="body-container">
      <div className="information-container">
        <h1 style={{ "fontSize": "24px" }}>Add Student</h1>
      </div>
      {/* {!successful && (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}> */}
          <TextField
            sx={{ minWidth: "50%", maxWidth: "50%" }}
            required
            label="Name"
            variant="standard"
            value={values.name}
            onChange={handleChange("name")}
          />
          <TextField
            sx={{ minWidth: "50%", maxWidth: "50%" }}
            required
            label="Tags"
            variant="standard"
            value={values.tags}
            onChange={handleChange("tags")}
          />
          <TextField
            sx={{ minWidth: "50%", maxWidth: "50%" }}
            required
            label="Subjects"
            variant="standard"
            value={values.subjects}
            onChange={handleChange("subjects")}
          />
          <TextField
            sx={{ minWidth: "50%", maxWidth: "50%" }}
            required
            label="Description"
            variant="standard"
            value={values.description}
            onChange={handleChange("description")}
          />
          <TextField
            sx={{ minWidth: "50%", maxWidth: "50%" }}
            required
            label="Email"
            variant="standard"
            value={values.email}
            onChange={handleChange("email")}
          />
        {/* </div>
      )} */}
      {message && (
        <div className="form-group">
          <Alert
            severity={
              successful ? "success" : "error"
            }
          >
            {message}
          </Alert>
        </div>
      )}
      
      <div className="contact-buttons">
          <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
              navigate(`/students`);
          }}
          sx={{ margin: "10px" }}
          >
          Go back!
          </Button>
          <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          onClick={addStudent}
        >
          Add new Student
        </Button>
      </div>         
    </div>
  );
}
