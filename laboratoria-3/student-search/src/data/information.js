import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/students.json")
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/data/groups.json").then((response) => {
      setGroups(response.data);
    });
  }, []);

  return (
    <GroupsContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupsContext.Provider>
  );
};