import React, { useEffect, useState } from "react";
import Password from "../components/Password";
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

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return false;
  } else {
    return true;
  }
};

function Login() {
    
    // const navigate = useNavigate();

    const [values, setValues] = useState({
      email: "email@s.com",
      password: "password",
      showPassword: true,
    });

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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
      if (validEmail(values.email) === false) {
        setEmailError(true);
      } else setEmailError(false);
    }, [values.email]);
  
    const handleLogin = () => {
  
      setMessage("");
      setSuccessful(false);
  
      if (emailError === false && passwordError === false) {
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
          {!successful && (
            <div>
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
                    <Button className="fluid ui button blue" onClick={()=>handleLogin()} >Submit</Button>
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
          </div>
        </div>
      </>
    );
  }
  
  export default Login;
  