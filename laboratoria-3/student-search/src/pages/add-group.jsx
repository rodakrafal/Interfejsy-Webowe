import React, { useContext, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default class GroupAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      name: "",
      description: "",
      tags: "",
      subjects: "",
      email: "",
      number: "",
      people: [{
        id: 0,
        name: "nazwa",
        email: "email",
      }],
      amountOfPeople: 1,
    }
  }

  updateName = (event) => {
    this.setState({ name: event.target.value });
  }
  updateDescription = (event) => {
    this.setState({ description: event.target.value });
  }
  updateTags = (event) => {
    this.setState({ tags: event.target.value });
  }
  updateSubjects = (event) => {
    this.setState({ subjects: event.target.value });
  }
  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleChange = (event) => {
    this.setState({ amountOfPeople: event.target.value });
    let newPeople = [];
    for (let i = 0; i < event.target.value; i++) {
      newPeople.push({
        id: i,
        name: "",
        email: "",
      });
    }
    this.setState({ people: newPeople });
  };

  updatePersonName = (id) => (event) => {
    const text = event.target.value;
    const people = this.state.people;
    people[id].name = text;
    this.setState({ people });
  }

  updatePersonMail = (id) => (event) => {
    const text = event.target.value;
    const people = this.state.people;
    people[id].mail = text;
    this.setState({ people });
  }

  addGroup = () => {
    console.log(this.state.people);
    const group = {
      name: this.state.name,
      description: this.state.description,
      tags: this.state.tags.split(" "),
      subjects: this.state.subjects.split(" "),
      email: this.state.email,
      number: this.props.groups.length + 1,
      people: this.state.people,
    }
    this.props.groups.push(group);

    this.props.navigate('/groups')
  };



  render() {
    return (
      <div className="body-container">
      <div className="information-container">
        <h1 style={{ "fontSize": "24px" }}>Add Group</h1>
      </div>
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Name"
        variant="standard"
        onChange={this.updateName}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Tags"
        variant="standard"
        onChange={this.updateTags}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Subjects"
        variant="standard"
        onChange={this.updateSubjects}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%" }}
        required
        label="Description"
        variant="standard"
        onChange={this.updateDescription}
      />
      <TextField
        sx={{ minWidth: "50%", maxWidth: "50%", padding:"0px 0px 20px 0px" }}
        required
        label="Email"
        variant="standard"
        onChange={this.updateEmail}
      />
      <div>
      <InputLabel>People</InputLabel>
        <Select
          value={this.amountOfPeople}
          label="Amount of People"
          onChange={this.handleChange}
          defaultValue={1}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem> 

        </Select>
      </div>
      <div>
        { 
            this.state.people.map((people, index) => (
              <div className="center-input">
                <div className="text-field-input">
                  <TextField key={index}
                    sx={{ minWidth: "100%", maxWidth: "100%" }}
                    required
                    label="Name"
                    variant="standard"
                    onChange={this.updatePersonName(index)}
                  />
                </div>
                <div className="text-field-input">
                  <TextField key={index}
                    sx={{ minWidth: "100%", maxWidth: "100%"}}
                    required
                    label="Email"
                    variant="standard"
                    onChange={this.updatePersonMail(index)}
                  />
                </div>
              </div>
            ))

        }         
      </div>
      
      <div className="contact-buttons">
          <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => this.props.navigate('/groups')}
          sx={{   margin: "10px" }}
          >
          Go back!
          </Button>
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={this.addGroup}
        >
          Add new Group
        </Button>
      </div>         
  </div>
  );}
}
