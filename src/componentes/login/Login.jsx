import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFirebaseApp } from "reactfire";
import useStyles from "./styles";
import { db } from "../../firebase/firebase";
import { setCurrentUser } from "../../store/currentUser";

import juniority from "../assets/juniority.svg";

const Login = () => {
  const firebase = useFirebaseApp();
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [formData, setFormData] = useState({ email: "", password1: "" });
  const { email, password1 } = formData;
  const history = useHistory();

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password1)
      .then((user) => {
        db.collection("user")
          .where("id", "==", user.user.uid)
          .get()
          .then((doc) =>
            doc.forEach((data) => {
              dispatch(setCurrentUser(data.data()));
              sessionStorage.setItem(
                "currentUser",
                JSON.stringify(data.data())
              );
              history.push("/");
            })
          );
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <Typography
        style={{
          textAlign: "start",
          width: "93%",
          margin: "auto",
        }}
      >
        <span
          style={{
            borderBottom: "solid 1px #3cb4e5",
            paddingBottom: "1%",
          }}
        >
          Log in
        </span>
      </Typography>
      <TextField
        className={classes.textField}
        id="outlined-search"
        label="Email"
        type="search"
        variant="outlined"
        placeholder="example@gmail.com"
        size="small"
        onChange={handleChange("email")}
        value={email}
      />
      <TextField
        className={classes.textField}
        id="outlined-password-input"
        label="Password"
        type="password"
        variant="outlined"
        placeholder="Password"
        size="small"
        onChange={handleChange("password1")}
        value={password1}
      />
      <Typography
        style={{
          textAlign: "end",
          fontSize: "78%",
          width: "93%",
          margin: "auto",
          marginTop: "6%",
        }}
      >
        <a href="/password-recovery">Forgot Password?</a>
      </Typography>
      <Typography
        style={{
          textAlign: "start",
          width: "93%",
          margin: "auto",
          marginTop: "3%",
        }}
      >
        <Button type="submit" color="primary" variant="contained">
          <i className="fas fa-sign-in-alt fa 1x w-6-ml-2" />
          <span className="ml-3">LOG IN </span>
        </Button>
      </Typography>

      <div
        style={{
          marginTop: "1%",
        }}
      >
        <Typography variant="caption" align="center">
          Or sign with social login <i className="fab fa-google w-10" />
          <i className="fab fa-facebook w-10-ml-2" />
        </Typography>
        <Link
          to="/register"
          className="w-full max-w-xs shadow-sm rounded-sm py-1 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-10"
        >
          <i className="fas fa-user-plus fa 1x w-6-ml-2 text-indigo-500" />
          <span className="ml-4">Are you new? Register</span>
        </Link>
      </div>
    </form>
  );
};

export default Login;
