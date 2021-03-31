import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFirebaseApp } from "reactfire";
import useStyles from "./styles";
import firbaseTime from "firebase";
import {
  auth,
  db,
  providerFacebook,
  providerGoogle,
} from "../../firebase/firebase";
import { setCurrentUser } from "../../store/currentUser";
import Alert from "@material-ui/lab/Alert";

import juniority from "../assets/juniority.svg";

const Login = () => {
  const firebase = useFirebaseApp();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password1: "" });
  const [messageError, setMessageError] = useState(false);
  const { email, password1 } = formData;
  const history = useHistory();

  const socialLogIn = (method) => {
    let data;
    if (method === "google") {
      auth.signInWithPopup(providerGoogle).then((result) => {
        data = {
          id: result.user.uid,
          fullName: result.additionalUserInfo.profile.name,
          email: result.additionalUserInfo.profile.email,
          timeStamp: firbaseTime.firestore.FieldValue.serverTimestamp(),
        };
        if (result.additionalUserInfo.isNewUser) {
          db.collection("user")
            .doc(result.user.uid)
            .set(data)
            .then(() => {
              dispatch(setCurrentUser(data));
              sessionStorage.setItem("currentUser", JSON.stringify(data));
              history.push("/");
            });
        } else {
          dispatch(setCurrentUser(data));
          sessionStorage.setItem("currentUser", JSON.stringify(data));
          history.push("/");
        }
      });
    } else {
      auth.signInWithPopup(providerFacebook).then((result) => {
        data = {
          id: result.user.uid,
          fullName: result.additionalUserInfo.profile.name,
          email: result.additionalUserInfo.profile.email,
          timeStamp: firbaseTime.firestore.FieldValue.serverTimestamp(),
        };
        if (result.additionalUserInfo.isNewUser) {
          db.collection("user")
            .doc(result.user.uid)
            .set(data)
            .then(() => {
              dispatch(setCurrentUser(data));
              sessionStorage.setItem("currentUser", JSON.stringify(data));
              history.push("/");
            });
        } else {
          dispatch(setCurrentUser(data));
          sessionStorage.setItem("currentUser", JSON.stringify(data));
          history.push("/");
        }
      });
    }
  };

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
          .then((doc) => {
            doc.forEach((data) => {
              dispatch(setCurrentUser(data.data()));
              sessionStorage.setItem(
                "currentUser",
                JSON.stringify(data.data())
              );
              history.push("/");
            });
          });
      })
      .catch((err) => setMessageError(err.message));
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
          Or login with a social media
          <i
            onClick={() => socialLogIn("google")}
            className="fab fa-google w-10"
          />
          <i
            onClick={() => socialLogIn("facebook")}
            className="fab fa-facebook w-10-ml-2"
          />
        </Typography>
        {messageError && <Alert severity="error">{messageError}</Alert>}
        {/* <Link
          to="/register"
          className="w-full max-w-xs shadow-sm rounded-sm py-1 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-10"
        >
          <i className="fas fa-user-plus fa 1x w-6-ml-2 text-indigo-500" />
          <span className="ml-4">Are you new? Register</span>
        </Link> */}
      </div>
    </form>
  );
};

export default Login;
