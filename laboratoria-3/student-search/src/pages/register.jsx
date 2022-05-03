import React, { useRef, useState, useEffect } from "react";
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
  // const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "name",
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

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (emailError === false && nameError === false && passwordError === false) {
        setMessage("bla bla bla udało sie gratuluje");
        setSuccessful(true);
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
                <TextField
                    required={true}
                    id="outlined-required-name"
                    label="Name"
                    value={values.username}
                    onChange={handleChange("username")}
                    error={nameError}
                />
                 {nameError && (
                  <Alert severity="warning">The name is not valid!</Alert>
                )}

                <TextField
                    required={true}
                    id="outlined-required-email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    error={emailError}
                />
                 {emailError && (
                  <Alert severity="warning">The email is not valid!</Alert>
                )}

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
                {passwordError && (
                  <Alert severity="warning">The password is not valid!</Alert>
                )}

                <div className="form-group">
                <button className="fluid ui button blue">Submit</button>
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
