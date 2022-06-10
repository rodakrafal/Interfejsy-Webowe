import "./styles/main-style.css";

import { LoggedUserContext } from "./context/information";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { UsersContext } from "./context/information";
import { auth } from "./firebase/init";

import { Button, Toolbar, Box, AppBar, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
  const { loggedUser, logout } = useContext(LoggedUserContext);
  const { dispatch } = useContext(UsersContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    signOut(auth);
  };

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
            <Box sx={{ padding: "0px 18px" }}>
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
            {loggedUser !== null ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span
                  style={{
                    display: "flex",
                    maxWidth: "150px",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 4,
                  }}
                >
                  {loggedUser.email}
                </span>

                <Button
                  color="inherit"
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </div>
            )}

            <IconButton
              size="large"
              aria-label="students-number"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default App;
