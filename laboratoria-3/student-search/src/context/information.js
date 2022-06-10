import React, { useState, createContext, useEffect, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
import axios from "axios";
import { firestore } from "../firebase/init";

import { doc, addDoc, getDocs, collection } from "firebase/firestore";

export const StudentsContext = createContext();

export const StudentsProvider = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(async () => {
    async function fetchData() {
      const result = await axios.get(
        "http://localhost:3000/data/students.json"
      );
      setStudents(result.data);
    }
    fetchData();

    try {
      const docRef = await addDoc(collection(firestore, "students"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }, []);

  const getNotes = async () => {
    const studentsDataBase = await firestore.collection("students").get();
    studentsDataBase.forEach((doc) => {
      console.log(doc.data());
    });
    setStudents(studentsDataBase);
  };

  useEffect(async () => {
    students.map((student) => {
      if (student.img === "") {
        student.img = "https://picsum.photos/210/300";
      }
      return student;
    });
  }, [students]);

  const editStudents = (student) => {
    const newStudents = [...students];
    const index = newStudents.findIndex((item) => item.id === student.id);
    newStudents[index] = student;
    setStudents(newStudents);
  };

  return (
    <StudentsContext.Provider value={{ students, setStudents, editStudents }}>
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
      dispatch({ type: "LOAD_USER", users: result.data });
    }
    fetchData();
  }, []);

  const login = (user) => {
    if (user !== null) {
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
