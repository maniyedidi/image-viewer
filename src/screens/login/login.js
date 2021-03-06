import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Button
} from "@material-ui/core";
import "./login.css";
import AppContext from "../../common/app-context";

const USER_DETAILS = {
  userName: "user",
  password: "user",
  access_token:
    "IGQVJVcEVXUlJadHlLTHVFSm9lWmw2REM3UjM2ZA3oxQnl0dVJoNkJydExDaUtNRVprRzdIc2FyWEhlWE9Ud3haV3BGOHJ3MnJfbWdZAWHNqQ21qRTZAyOG9EYkRxWEVWZAkNYZA05sTlZAzYmFEQjN6Ym5MNQZDZD"
};
const Login = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    login: false,
    userName: false,
    password: false
  });

  const login = () => {
    if (!username || !password) {
      setError({
        ...error,
        userName: !username,
        password: !password
      });
    } else if (
      username === USER_DETAILS.userName &&
      password === USER_DETAILS.password
    ) {
      setError({
        ...error,
        login: false
      });
      sessionStorage.setItem("access_token", USER_DETAILS.access_token);
      history.push("/home");
      setIsLoggedIn(true);
    } else {
      setError({
        ...error,
        login: true
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-conatiner">
        <Card>
          <CardContent>
            <div className="login-form">
              <h2>LOGIN</h2>
              <FormControl>
                <InputLabel htmlFor="my-input">Username *</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={username}
                  onChange={event => {
                    setError({
                      ...error,
                      login: false,
                      userName: false
                    });
                    setUserName(event.target.value);
                  }}
                />
                {error.userName && (
                  <span className="error-message">required</span>
                )}
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Password *</InputLabel>
                <Input
                  type="password"
                  id="my-input"
                  value={password}
                  aria-describedby="my-helper-text"
                  onChange={event => {
                    setError({
                      ...error,
                      login: false,
                      password: false
                    });
                    setPassword(event.target.value);
                  }}
                />
                {error.password && (
                  <span className="error-message">required</span>
                )}
              </FormControl>
              {error.login && (
                <span className="error-message">
                  Incorrect username and/or password
                </span>
              )}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  onClick={login}
                >
                  LOGIN
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
