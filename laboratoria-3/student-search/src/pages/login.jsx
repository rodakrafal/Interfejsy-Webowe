import React, { useEffect, useState, useContext } from "react";
import { LoggedUserContext } from "../context/information";
import { isEmail } from "validator";
import { auth } from "../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Alert,
  Button,
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
  const { loggedUser, login } = useContext(LoggedUserContext);

  const [values, setValues] = useState({
    email: "email@s.com",
    password: "password",
    showPassword: true,
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [user, loading, error] = useAuthState(auth);

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
    if (loggedUser === null) {
      setSuccessful(false);
      setMessage("");
    }
  }, [loggedUser]);

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
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setMessage("bla bla bla udało sie gratuluje");
          setSuccessful(true);
          login(user);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              setMessage("User not found");
              setSuccessful(false);
              break;
            case "auth/wrong-password":
              setMessage("Wrong password");
              setSuccessful(false);
              break;
            default:
              setMessage(error.message);
              setSuccessful(false);
          }
        });
    } else {
      setMessage("bla bla bla nie udało sie gratuluje");
      setSuccessful(false);
    }
  };

  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        login(user);
        setMessage(`Succes`);
        setSuccessful(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        errorMessage(errorCode);
      });
  };

  const handleGithubLogin = () => {
    const gitHubProvider = new GithubAuthProvider();
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        login(user);
        setMessage(`Succes`);
        setSuccessful(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        errorMessage(errorCode);
      });
  };

  const errorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/account-exists-with-different-credential":
        setMessage(
          `There is an account already associated with this email address. Sign in using that account or delete it, then link it with your current account`
        );
        break;
      case "auth/credential-already-in-use":
        setMessage(
          `There is an account already associated with this email address. Sign in using that account or delete it, then link it with your current account`
        );
        break;
      case "auth/email-already-in-use":
        setMessage(
          `There is an account already associated with this email address. Sign in using that account or delete it, then link it with your current account`
        );
        break;
      case "auth/operation-not-allowed":
        setMessage(`You must enable Google authentication on your project`);
        break;
      case "auth/requires-recent-login":
        setMessage(`You must sign in again before reauthenticating.`);
        break;
      case "auth/user-disabled":
        setMessage(`The user account has been disabled.`);
        break;
      case "auth/user-not-found":
        setMessage(
          `There is no user record corresponding to this identifier. The user may have been deleted.`
        );
        break;
      case "auth/wrong-password":
        setMessage(
          `The password is invalid or the user does not have a password.`
        );
        break;
      default:
        setMessage(`error: ${error.message}`);
        setSuccessful(false);
    }
  }

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
                <Button
                  className="fluid ui button blue"
                  onClick={() => handleLogin()}
                >
                  Submit
                </Button>
              </div>
              <Button onClick={handleGoogleLogin}>Login with Google</Button>
              <Button onClick={handleGithubLogin}>Login with Github</Button>
            </div>
          )}
          {message && (
            <div className="form-group">
              <Alert severity={successful ? "success" : "error"}>
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
