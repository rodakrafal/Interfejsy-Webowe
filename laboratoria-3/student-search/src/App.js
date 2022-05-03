import "./styles/main-style.css";

import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Toolbar, Box, AppBar, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="navbar">
        <AppBar>
          <Toolbar>
            <Box component="div" sx={{ flexGrow: 1 }}>
              <button
                className="navbar-button"
                onClick={() => {
                  navigate("/");
                }}
              >
                <h3>Search For Help!</h3>
              </button>
            </Box>
            <Box sx={{padding: "0px 18px" }}>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/students");
                }}
              >
                Students
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/groups");
                }}
              >
                Groups
              </Button>
            </Box>
            {
              isLogged ?
                  <Button color="inherit">Logout</Button>              
              :
              <div>
                <Button color="inherit"
                  onClick={() => {
                    navigate("/login");
                  }}
                  >Login</Button>
                <Button color="inherit"
                  onClick={() => {
                    navigate("/register");
                  }}
                >Register</Button>
              </div>

            }

            <IconButton size="large" aria-label="students-number" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}

export default App;
