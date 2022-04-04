import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InformationStudentsContext } from "../data/informationStudentsContext";

import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';

export default function Students() {
  const [students, setStudents] = useContext(InformationStudentsContext);

  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="body-container">
        <nav>
          <div className="body-header">
            <TextField
              label="Enter search criteria"
              variant="standard"
              onChange={(event) => {
                let filter = event.target.value;
                setSearch(filter);
              }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={handleChange}>
                <MenuItem value={0}>All</MenuItem>
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
          </nav>
          <div className="body-content">
          {students
            .filter((student) => {
              if (!search) return true;
              let studentName = student.name.toLowerCase().split(" ");
              let studentTags = student.tags;
              let studentSubjects = student.subjects;
              let studentDescription = student.description
                .toLowerCase()
                .split(" ");

              let regexDescription = /\{(.*?)\}/g;
              let regexTags = /\[(.*?)\]/g;
              let regexSubject = /\((.*?)\)/g;
              let regexName = /\"(.*?)\"/g;
              let filteredDescription = regexDescription.exec(search);
              let filteredTags = regexTags.exec(search);
              let filteredSubject = regexSubject.exec(search);
              let filteredName = regexName.exec(search);
              let desc, tags, subjects, name;

              if (filteredDescription) {
                desc = filteredDescription[1].split(" ");
              }
              if (filteredTags) {
                tags = filteredTags[1].split(" ");
              }
              if (filteredSubject) {
                subjects = filteredSubject[1].split(" ");
              }
              if (filteredName) {
                name = filteredName[1].split(" ");
              }

              if (desc === undefined) {
                desc = null;
              }
              if (tags === undefined) {
                tags = null;
              }
              if (subjects === undefined) {
                subjects = null;
              }
              if (name === undefined) {
                name = null;
              }

              if (
                (desc === null
                  ? true
                  : desc.every((item) =>
                      studentDescription.some((description) =>
                        description.includes(item.toLowerCase())
                      )
                    )) &&
                (tags === null
                  ? true
                  : tags.every((item) =>
                      studentTags.some((tag) =>
                        tag.includes(item.toLowerCase())
                      )
                    )) &&
                (subjects === null
                  ? true
                  : subjects.every((item) =>
                      studentSubjects.some((subject) =>
                        subject.includes(item.toLowerCase())
                      )
                    )) &&
                (name === null
                  ? true
                  : name.every((item) =>
                      studentName.some((name) =>
                        name.includes(item.toLowerCase())
                      )
                    ))
              ) {
                return student.name;
              }
            })
            .map((student) => (
              <Accordion sx={{minWidth:'75%', maxWidth:'75%'}} key={student.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <h1>{student.name}</h1>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider>TAGS</Divider>
                  <Typography component={'ul'}>
                      {student.tags.map((item) =>
                        <li>{item}</li> 
                      )}
                  </Typography>
                  <Divider>SUBJECTS</Divider>
                    <ul>
                      {student.subjects.map((item) =>
                        <li>{item}</li> 
                      )}
                    </ul>
                  <Divider>DESCRIPTION</Divider>
                  <span>
                    {student.description}
                  </span>
                  <div className="center-button">
                    <Button key={student.id} variant="contained" endIcon={<SendIcon />} onClick={() => {
                        navigate(`/students/${student.number}/student-contact`);
                      }}>
                      Contact!
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>         
      </div>
    </>
  );
}
