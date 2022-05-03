import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const ListOfStudentsContext = createContext();

export const ListOfStudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/students.json")
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

  return (
    <ListOfStudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </ListOfStudentsContext.Provider>
  );
};

export const ListOfGroupsContext = createContext();

export const ListOfGroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/data/groups.json").then((response) => {
      setGroups(response.data);
    });
  }, []);

  return (
    <ListOfGroupsContext.Provider value={{ groups, setGroups }}>
      {children}
    </ListOfGroupsContext.Provider>
  );
};