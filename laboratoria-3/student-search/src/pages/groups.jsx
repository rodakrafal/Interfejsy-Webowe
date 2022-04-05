import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupAdd from "./add-group";
import { InformationGroupsContext } from "../data/informationGroupsContext";

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

export default function Groups() {
  const [groups, setGroups] = useContext(InformationGroupsContext);

  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="body-container">
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
              <MenuItem value={5}>Students</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={() => {
              navigate(`/add-group`);
            }}
          >
            Group
          </Button>
        </div>

        <div className="body-content">
          {groups
            .filter((group) => {
              if (!search) return true;
              let groupName = group.name.toLowerCase().split(" ");
              let groupTags = group.tags;
              let groupSubjects = group.subjects;
              let groupSubjectsArray = [];
              groupSubjects.forEach((subject) => {
                subject.split(" ").forEach((word) => {
                  groupSubjectsArray.push(word.toLowerCase());
                });
              });
             
              let groupDescription = group.description.toLowerCase().split(" ");
              let groupPerson = group.people.map((student) => {
                return student.name.toLowerCase();
              });

              if (category === 0) {
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
                        groupDescription.some((description) =>
                          description.includes(item.toLowerCase())
                        )
                      )) &&
                  (tags === null
                    ? true
                    : tags.every((item) =>
                        groupTags.some((tag) =>
                          tag.includes(item.toLowerCase())
                        )
                      )) &&
                  (subjects === null
                    ? true
                    : subjects.every((item) =>
                        groupSubjects.some((subject) =>
                          subject.includes(item.toLowerCase())
                        )
                      )) &&
                  (name === null
                    ? true
                    : name.every((item) =>
                        groupName.some((name) =>
                          name.includes(item.toLowerCase())
                        )
                      ))
                ) {
                  return group.name;
                }
              } else if (category === 1) {
                let names = search.split(" ");
                if (names === undefined) {
                  names = null;
                }
                if (
                  names === null
                    ? true
                    : names.every((item) =>
                        groupName.some((name) =>
                          name.includes(item.toLowerCase())
                        )
                      )
                ) {
                  return group.name;
                }
              } else if (category === 2) {
                let tags = search.split(" ");
                if (tags === undefined) {
                  tags = null;
                }
                if (
                  tags === null
                    ? true
                    : tags.every((item) =>
                        groupTags.some((name) =>
                          name.includes(item.toLowerCase())
                        )
                      )
                ) {
                  return group.name;
                }
              } else if (category === 3) {
                let dec = search.split(" ");
                if (dec === undefined) {
                  dec = null;
                }
                if (
                  dec === null
                    ? true
                    : dec.every((item) =>
                        groupDescription.some((name) =>
                          name.includes(item.toLowerCase())
                        )
                      )
                ) {
                  return group.name;
                }
              } else if (category === 4) {
                let sub = search.split(" ");
                if (sub === undefined) {
                  sub = null;
                }
                console.log(sub);
                console.log(groupSubjectsArray);
                if (
                  sub === null
                    ? true
                    : sub.every((item) =>
                    groupSubjectsArray.some((name) =>
                          name.includes(item.toLowerCase())
                        )
                      )
                ) {
                  return group.name;
                }
              } else if (category === 5) {
                let people = search.split(" ");
                if (people === undefined) {
                  people = null;
                }
                if (
                  people === null
                    ? true
                    : people.every((item) =>
                        groupPerson.some((name) =>
                          name.includes(item.toLowerCase())
                        )
                      )
                ) {
                  return group.name;
                }
     
              }
            })
            .map((group) => (
              <Accordion
                sx={{ minWidth: "75%", maxWidth: "75%" }}
                key={group.id}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1>{group.name}</h1>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider>TAGS</Divider>
                  <Typography component={"ul"}>
                    {group.tags.map((item) => (
                      <li>{item}</li>
                    ))}
                  </Typography>
                  <Divider>SUBJECTS</Divider>
                  <ul>
                    {group.subjects.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                  <Divider>STUDENTS</Divider>
                  <ul>
                    {group.people.map((item) => (
                      <li>{item.name}</li>
                    ))}
                  </ul>
                  <Divider>DESCRIPTION</Divider>
                  <span>{group.description}</span>
                  <div className="center-button">
                    <Button
                      key={group.id}
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={() => {
                        navigate(`/groups/${group.number}/group-contact`);
                      }}
                    >
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
