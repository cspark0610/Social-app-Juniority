import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Animation from "../animation/Animation";
import Learning from "../assets/53882-distance-education.json";
import rocket from "../assets/rocket.svg";
import logo from "../assets/juniorityText.svg";
import { useFirebaseApp } from "reactfire";
import { db } from "../../firebase/firebase";
import firbaseTime from "firebase";
import Alert from "@material-ui/lab/Alert";
import Login from "../login/Login.jsx";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";

const Register = () => {
  const firebase = useFirebaseApp();
  const history = useHistory();
  const classes = useStyles();

  const [passwordError, setPasswordError] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [lengthError, setLengthError] = useState(false);
  const { fullName, email, password1, password2 } = formData;
  const [change, setChange] = useState(["primary", "secondary"]);
  const currentUser = useSelector((state) => state.currentUser);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    if (text === "password1") {
      if (password1.length < 6) {
        setLengthError(true);
      } else {
        setLengthError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setPasswordError("The passwords must be equals");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password1)
        .then((user) => {
          db.collection("user")
            .doc(user.user.uid)
            .set({
              id: user.user.uid,
              fullName,
              email,
              timeStamp: firbaseTime.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => setChange(["primary", "secondary"]));
        })
        .catch((error) => setPasswordError(error.message));
    }
  };
  return (
    <>
      {currentUser ? (
        history.push("/")
      ) : (
        <div className={classes.bg}>
          <Grid
            container
            justify="center"
            spacing={8}
            className={classes.gridContainer}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              style={{
                margin: 0,
                padding: 0,
                // border: "black solid 1px",
                textAlign: "end",
              }}
            >
              <Button
                color={change[0]}
                variant="contained"
                onClick={() => {
                  setChange(["primary", "secondary"]);
                }}
              >
                Log in
              </Button>
              <Button
                color={change[1]}
                variant="contained"
                onClick={() => {
                  setChange(["secondary", "primary"]);
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid
              item
              lg={6}
              component={Box}
              display={{ xs: "none", lg: "block" }}
            >
              <div
                className="flex-1 bg-indigo-100 text-center hidden lg:flex"
                style={{
                  backgroundImage: `url(${rocket})`,
                  objectFit: "contain",
                }}
              >
                <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                  <h1 className="text-2xl xl:text-3xl font-black">
                    {" "}
                    JUNIORITY
                  </h1>
                  <Animation src={Learning} />
                  <Typography
                    variant="body2"
                    style={{ backgroundColor: "white" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta vero repellendus quaerat dolores, ipsum numquam
                    molestias ad?
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              {change[0] === "primary" ? (
                <Login />
              ) : (
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                  <TextField
                    className={classes.textField}
                    id="outlined-name"
                    label="Name"
                    type="text"
                    variant="outlined"
                    placeholder="Full Name"
                    size="small"
                    onChange={handleChange("fullName")}
                    value={fullName}
                  />
                  <TextField
                    className={classes.textField}
                    id="outlined-search"
                    label="Email"
                    type="email"
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
                  <TextField
                    className={classes.textField}
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    placeholder="Confirm Password"
                    onChange={handleChange("password2")}
                    value={password2}
                  />
                  <div
                    style={{
                      marginTop: "1%",
                    }}
                  >
                    <Typography variant="caption" align="center">
                      <div className=" border-b text-center">
                        <div className=" flex-1 leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                          Or Register with email{" "}
                          <i className="fab fa-google w-10" />{" "}
                          <i className="fab fa-facebook w-10-ml-2" />
                        </div>
                      </div>
                    </Typography>
                    {passwordError && (
                      <Alert severity="error" className="mt-5">
                        {passwordError}
                      </Alert>
                    )}
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" required />}
                      style={{ marginTop: "5%" }}
                      label={
                        <div>
                          <span>
                            Yes, I understand and agree the Juniority.{" "}
                          </span>
                          <Link to={"/terms"} style={{ color: "#3CB4E6" }}>
                            Terms & Conditions
                          </Link>
                        </div>
                      }
                      labelPlacement="end"
                      className={classes.checkbox}
                    />
                    <Typography
                      style={{
                        textAlign: "start",
                        width: "93%",
                        margin: "auto",
                        marginTop: "10%",
                      }}
                    >
                      <Button type="submit" color="primary" variant="contained">
                        <i className="fas fa-user-plus fa 1x w-6  -ml-2" />{" "}
                        <span className="ml-3">Get started </span>{" "}
                      </Button>
                    </Typography>
                  </div>
                </form>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default Register;
