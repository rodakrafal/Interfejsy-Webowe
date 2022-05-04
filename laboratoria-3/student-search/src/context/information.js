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
export const LoggedUser = createContext();

export const UsersProvider = (props) => {

  const loggedUserReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return  {
          email: action.user.email, 
          password: action.user.password, 
          login: action.user.login,
          id: uuidv4()
        }
    case 'LOGOUT_USER':
          return state.find(user => user.id === action.id);
      default:
        return state;
    }
  }

  const [loggedUser, dispatchLoggedUser] = useReducer(loggedUserReducer, {}, () => {
    const localData = localStorage.getItem('user');
    return localData ? JSON.parse(localData) : {id: -1};
  });

  const [users, dispatch] = useReducer(userReducer, []);

  async function fetchData() {
    const result = await axios.get("http://localhost:3000/data/users.json")
    return await result.data;
  }
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3000/data/students.json");
      dispatch({type: 'LOAD_USER', users: result.data});
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(loggedUser));
  }, [loggedUser]);

  return (
    <UsersContext.Provider value={{ users, dispatch }}>
      <LoggedUser.Provider value={{ loggedUser, dispatchLoggedUser }}>
        {props.children}
      </LoggedUser.Provider>
    </UsersContext.Provider>
  );
};