import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Animation from "../animation/Animation";
import Learning from "../assets/53882-distance-education.json";
import rocket from "../assets/rocket.svg";
import { useFirebaseApp } from "reactfire";
import { db } from "../../firebase/firebase";
import Alert from "@material-ui/lab/Alert";
import Login from "../login/Login.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { setCurrentUser } from "../../store/currentUser";

const Register = () => {
  const firebase = useFirebaseApp();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [passwordError, setPasswordError] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { fullName, email, password1, password2 } = formData;
  const [change, setChange] = useState(["primary", "secondary"]);
  const currentUser = useSelector((state) => state.currentUser);
  const [changeUser, setChangeUser] = useState(["primary", "secondary"]);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (password1 !== password2) {
      setPasswordError("The passwords must be equals");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password1)
        .then((user) => {
          data = {
            id: user.user.uid,
            fullName,
            email,
            follow: [],
            followers: [],
            // messages: [],
            experience: [],
            education: [],
            location: "No info",
            position: "No info",
            avatar: "https://img.favpng.com/0/15/12/computer-icons-avatar-male-user-profile-png-favpng-ycgruUsQBHhtGyGKfw7fWCtgN.jpg",
            userType: changeUser[0] === "primary" ? "user" : "company",
          };
          db.collection("user")
            .doc(user.user.uid)
            .set(data)
            .then(() => {
              dispatch(setCurrentUser(data));
              localStorage.setItem("currentUser", JSON.stringify(data));
              history.push("/");
            });
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
          <Grid container justify='center' spacing={8} className={classes.gridContainer} alignItems='stretch'>
            <Grid item xs={12} style={{ margin: 0, padding: 0, textAlign: "end" }}>
              <Button
                color={change[0]}
                variant='contained'
                onClick={() => {
                  setChange(["primary", "secondary"]);
                }}
                className={classes.button}
              >
                Log in
              </Button>
              <Button
                color={change[1]}
                variant='contained'
                onClick={() => {
                  setChange(["secondary", "primary"]);
                }}
                className={classes.button}
              >
                Register
              </Button>
            </Grid>
            <Grid item md={6} component={Box} display={{ xs: "none", md: "block" }}>
              <div
                className='flex-1 bg-indigo-100 text-center hidden lg:flex'
                style={{
                  backgroundImage: `url(${rocket})`,
                  objectFit: "contain",
                }}
              >
                <div className='m-10 xl:m-12 pt-0 mt-4 w-full bg-contain bg-center bg-no-repeat'>
                  <h1 className='text-2xl xl:text-3xl font-black'> JUNIORITY</h1>
                  <Animation src={Learning} />
                  <Typography variant='body2' style={{ backgroundColor: "white" }}>
                    Un lugar donde la gente pueda postear dudas. Un lugar donde juniors, puedan conseguir empleo. Un lugar donde las empresas, puedan conseguir juniors
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ padding: "auto", paddingTop: "3rem" }}>
              {change[0] === "primary" ? (
                <Login />
              ) : (
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                  <Grid item xs={12} className={`${classes.companyOrUser} py-5 `}>
                    <Button
                      color={changeUser[0]}
                      variant='contained'
                      onClick={() => {
                        setChangeUser(["primary", "secondary"]);
                      }}
                      className={classes.button}
                    >
                      User
                    </Button>
                    <Button
                      className={classes.button}
                      color={changeUser[1]}
                      variant='contained'
                      onClick={() => {
                        setChangeUser(["secondary", "primary"]);
                      }}
                    >
                      Company
                    </Button>
                  </Grid>
                  <TextField className={classes.textField} id='outlined-name' label='Name' type='text' variant='outlined' placeholder='Full Name' size='small' onChange={handleChange("fullName")} value={fullName} />
                  <TextField className={classes.textField} id='outlined-search' label='Email' type='email' variant='outlined' placeholder='example@gmail.com' size='small' onChange={handleChange("email")} value={email} />
                  <TextField className={classes.textField} id='outlined-password-input' label='Password' type='password' variant='outlined' placeholder='Password' size='small' onChange={handleChange("password1")} value={password1} />
                  <TextField className={classes.textField} label='Confirm Password' type='password' variant='outlined' size='small' placeholder='Confirm Password' onChange={handleChange("password2")} value={password2} />
                  <div style={{ marginTop: "1%" }}>
                    {passwordError && (
                      <Alert severity='error' className='mt-5'>
                        {passwordError}
                      </Alert>
                    )}
                    <FormControlLabel
                      value='end'
                      control={<Checkbox color='primary' required />}
                      style={{ marginTop: "5%" }}
                      label={
                        <div>
                          <span>Yes, I understand and agree the Juniority. </span>
                          <Link to={"/terms"} style={{ color: "#3CB4E6" }}>
                            Terms & Conditions
                          </Link>
                        </div>
                      }
                      labelPlacement='end'
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
                      <Button type='submit' color='primary' variant='contained'>
                        <i className='fas fa-user-plus fa 1x w-6  -ml-2' /> <span className='ml-3'>Get started </span>{" "}
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
