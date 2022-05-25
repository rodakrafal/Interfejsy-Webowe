import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/information";
import { isEmail } from "validator";

import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Alert,
  Button
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return false;
  } else {
    return true;
  }
};

const validUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return false;
  } else {
    return true;
  }
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return false;
  } else {
    return true;
  }
};

function Register() {
  const { users, dispatch } = useContext(UsersContext);

  const [values, setValues] = useState({
    username: "login",
    email: "email@s.com",
    password: "password",
    showPassword: true,
  });

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (validPassword(values.password) === false) {
      setPasswordError(true);
    } else setPasswordError(false);
  }, [values.password]);

  useEffect(() => {
    if (validUsername(values.username) === false) {
      setNameError(true);
    } else setNameError(false);
  }, [values.username]);

  useEffect(() => {
    if (validEmail(values.email) === false) {
      setEmailError(true);
    } else setEmailError(false);
  }, [values.email]);

  const handleRegister = () => {

    setMessage("");
    setSuccessful(false);

    if (emailError === false && nameError === false && passwordError === false) {
      if(users.find(user => user.email === values.email || user.login === values.username)) {
        setMessage("User already exists");
      } else {
        setMessage("bla bla bla udało sie gratuluje");
        setSuccessful(true);
        dispatch({ type: 'REGISTER_USER', user: { 
          email: values.email, 
          password: values.password,
          login: values.username
        }});
      }

    } else {
        setMessage("bla bla bla nie udało sie gratuluje");
        setSuccessful(false);
    }
  };

  return (
    <>
      <div className="body-container">
        <div className="paper">
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleRegister}
          >
            {!successful && (
              <div>

                <div className="form-group">
                <TextField
                    required={true}
                    id="outlined-required-name"
                    label="Login"
                    value={values.username}
                    onChange={handleChange("username")}
                    error={nameError}
                />
                </div>
                
                <div className="form-group">
                 {nameError && (
                  <Alert severity="warning">The name is not valid!</Alert>
                )}
                </div>
                
                <div className="form-group">
                <TextField
                    required={true}
                    id="outlined-required-email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    error={emailError}
                />
                </div>

                <div className="form-group">
                 {emailError && (
                  <Alert severity="warning">The email is not valid!</Alert>
                )}
                </div>

                <div className="form-group">
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    required={true}
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    error={passwordError}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                </div>

                <div className="form-group">
                {passwordError && (
                  <Alert severity="warning">The password is not valid!</Alert>
                )}
                </div>

                <div className="form-group">
                    <Button className="fluid ui button blue" onClick={()=>handleRegister()} >Submit</Button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <Alert
                  severity={
                    successful ? "success" : "error"
                  }
                >
                  {message}
                </Alert>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
