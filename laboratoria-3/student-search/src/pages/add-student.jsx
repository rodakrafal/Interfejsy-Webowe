import React, { useContext, useState } from "react";
import { InformationStudentsContext } from "../data/informationStudentsContext";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function StudentAdd() {
  const [students, setStudents] = useContext(InformationStudentsContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [subjects, setSubjects] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const updateName = (event) => {
    setName(event.target.value);
  };
  const updateDescription = (event) => {
    setDescription(event.target.value);
  };
  const updateTags = (event) => {
    setTags(event.target.value);
  };
  const updateSubjects = (event) => {
    setSubjects(event.target.value);
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const addStudent = (event) => {
    event.preventDefault();
    const student = students.find((student) => student.name === name);
    if (student) {
      alert("The student is already in the list");
      return;
    }
    const emailStudent = students.find((student) => student.email === email);
    if (emailStudent) {
      alert("The email is already in the list");
      return;
    }

    if (
      name === "" ||
      email === "" ||
      tags === "" ||
      subjects === "" ||
      description === ""
    ) {
      alert("You must fill all the fields");
      return;
    }

    setStudents((prevStudents) => [
      ...prevStudents,
      {
        name: name,
        description: description,
        tags: tags.split(" "),
        subjects: subjects.split(" "),
        email: email,
        number: prevStudents.length + 1,
      },
    ]);
    navigate(`/students`);
  };

  return (
    <div className="body-container">
      <div className="information-container">
        <h1 style={{ "fontSize": "24px" }}>Add Student</h1>
      </div>

      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Name"
        variant="standard"
        onChange={updateName}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Tags"
        variant="standard"
        onChange={updateTags}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Subjects"
        variant="standard"
        onChange={updateSubjects}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Description"
        variant="standard"
        onChange={updateDescription}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Email"
        variant="standard"
        onChange={updateEmail}
      />
      
      <div className="contact-buttons">
                <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                    navigate(`/students`);
                }}
                sx={{   margin: "10px" }}
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
