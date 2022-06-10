import React, { useState, createContext, useEffect, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const StudentsContext = createContext();

export const StudentsProvider = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3000/data/students.json");
      setStudents(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    students.map(student => {
      if (student.img === ""){
        student.img = "https://picsum.photos/210/300";
      }
      return student;
    })
    console.log(students);
  }, [students]);
  
  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {props.children}
    </StudentsContext.Provider>
  );
};

export const GroupsContext = createContext();

export const GroupsProvider = (props) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3000/data/groups.json");
      setGroups(result.data);
    }
    fetchData();
  }, []);

  return (
    <GroupsContext.Provider value={{ groups, setGroups }}>
      {props.children}
    </GroupsContext.Provider>
  );
};
export const UsersContext = createContext();
export const LoggedUserContext = createContext();

export const UsersProvider = (props) => {

  const [loggedUser, setLoggedUser] = useState(null);
  const [users, dispatch] = useReducer(userReducer, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3000/data/users.json");
      dispatch({type: 'LOAD_USER', users: result.data});
    }
    fetchData();
    
  }, []);
  
  const login = (user) => {
    if(user !== null){
      setLoggedUser(user);
    }
  };

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <UsersContext.Provider value={{ users, dispatch }}>
      <LoggedUserContext.Provider value={{ loggedUser, login, logout }}>
        {props.children}
      </LoggedUserContext.Provider>
    </UsersContext.Provider>
  );
};
