import "./App.css";
import "./styles/main-style.css"

import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function App() {

  const [value, setValue] = useState();

  const navigate = useNavigate()
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 0){
      navigate('/students');   
    }
    if(newValue === 1){
      navigate('/groups'); 
    }
  };

  return (
    <>
    <div className ="navbar">
      <button className="navbar-button" onClick={() => {
        navigate('/')
        setValue(null);
        }}><h1>Search For Help!</h1></button>
      <nav
      >
        <Box sx={{ width: '100%' }}>
          <Tabs
            onChange={handleChange}
            value={value}
            aria-label="Tabs where each tab needs to be selected manually"
          >
            <Tab label="Students" />
            <Tab label="Groups" />
        </Tabs>
      </Box>
      </nav>
    </div>
      <Outlet />
    </>
  );
}

export default App;
