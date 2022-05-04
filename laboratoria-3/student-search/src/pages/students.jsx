import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentsContext } from "../context/information";
import axios from "axios";

import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";

const Students = () => {
  const { students, setStudents } = useContext(StudentsContext);
  const [ change, setChange] = useState(false);

  useEffect(() => {
    setStudents(
      students.map((elem) => {
        if(elem.image === ""){
          fetch("https://picsum.photos/210/300")
          .then(res => {
            return res;
          })
          .then((img) => {
            elem.image = img.url;
            console.log(img.url);
            // this doesn't work because of the async nature of the fetch - the image is not yet available
            // if(students.length - 1 === elem.number){
              //   setChange(!change);
              // }
            // not a great way to do this but works
            setChange(!change);
          });
        }
        return elem;
      })
    );
  }, [change]);

  const [category, setCategory] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const filterListStudents = students
    .filter((student) => {
      if (!search) return true;
      let studentName = student.name.toLowerCase().split(" ");
      let studentTags = student.tags;
      let studentSubjects = student.subjects;
      let studentDescription = student.description
        .toLowerCase()
        .split(" ");
        let studentSubjectsArray = [];
        studentSubjects.forEach((subject) => {
          subject.split(" ").forEach((word) => {
            studentSubjectsArray.push(word.toLowerCase());
          });
        });
      if (category === 1) {
        let names = search.split(" ");
        if (names === undefined) {
          names = null;
        }
        if (
          names === null
            ? true
            : names.every((item) =>
                studentName.some((name) =>
                  name.includes(item.toLowerCase())
                )
              )
        ) {
          return student.name;
        }
      }
      if (category === 2) {
        let tags = search.split(" ");
        if (tags === undefined) {
          tags = null;
        }
        if (
          tags === null
            ? true
            : tags.every((item) =>
                studentTags.some((name) =>
                  name.includes(item.toLowerCase())
                )
              )
        ) {
          return student.name;
        }
      }
      if (category === 3) {
        let desc = search.split(" ");
        if (desc === undefined) {
          desc = null;
        }
        if (
          desc === null
            ? true
            : desc.every((item) =>
                studentDescription.some((name) =>
                  name.includes(item.toLowerCase())
                )
              )
        ) {
          return student.name;
        }
      }
      if (category === 4) {
        let sub = search.split(" ");
        if (sub === undefined) {
          sub = null;
        }
        if (
          sub === null
            ? true
            : sub.every((item) =>
              studentSubjectsArray.some((name) =>
                  name.includes(item.toLowerCase())
                )
              )
        ) {
          return student.name;
        }
      }
    })

  return (
    <>
      <div className="body-container">
          <div className="body-header">
            <TextField
              label="Enter search criteria"
              variant="standard"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleChange}
                defaultValue={0}
              >
                <MenuItem value={1}>Name</MenuItem>
                <MenuItem value={2}>Tags</MenuItem>
                <MenuItem value={3}>Description</MenuItem>
                <MenuItem value={4}>Subjects</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddBoxIcon />}
              onClick={() => {
                navigate(`/add-student`);
              }}
            >
              Student
            </Button>
          </div>
        <div className="body-content">
          
          {
          filterListStudents.map((student, index) => (
            // <div key={index}>
              <Accordion
                sx={{ minWidth: "75%", maxWidth: "75%" }}
                key={index}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>{student.name}</h1>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider>TAGS</Divider>
                  <Typography component={"ul"}>
                    {student.tags.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </Typography>
                  <Divider>SUBJECTS</Divider>
                  <ul>
                    {student.subjects.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <Divider>DESCRIPTION</Divider>
                  <span>{student.description}</span>
                  <Divider>PICTURE</Divider>
                  <img src={student.image} alt="student" />
                  <div className="center-button">
                    <Button
                      key={student.id}
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={() => {
                        navigate(`/students/student-contact`, {state: student});
                      }}
                    >
                      Contact!
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion> 

            // </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Students;

             