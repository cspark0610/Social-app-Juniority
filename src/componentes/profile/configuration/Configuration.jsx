import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import Navbar from "../../navbar/Navbar";
import useStyles from "./configurationStyles";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../../../store/currentUser";

export const Configuration = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState();
  const [fullNameInput, setFullNameInput] = useState();
  const [locationInput, setLocationInput] = useState();
  const [positionInput, setPositionInput] = useState();
  const [portfolioInput, setPortfolioInput] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref("POST-USER-AVATAR");
    if (file) {
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setImageUrl(await fileRef.getDownloadURL());
    }
  };

  useEffect(() => {
    setFullNameInput(currentUser.fullName);
    setLocationInput(currentUser.location);
    setPositionInput(currentUser.position);
    setPortfolioInput(currentUser.portfolio);
    setImageUrl(currentUser.avatar);
  }, [currentUser]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let updatedUser = { ...currentUser };
    console.log("CURRENT", currentUser, imageUrl);
    updatedUser.fullName = fullNameInput;
    updatedUser.location = locationInput;
    updatedUser.position = positionInput;
    updatedUser.avatar = imageUrl;
    updatedUser.portfolio = portfolioInput;
    console.log(updatedUser);
    await db.collection("user").doc(currentUser.id).set(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    history.push(`/profile/${currentUser.id}`);
  };
  return (
    <div className={classes.mainContainer}>
      <Navbar></Navbar>
         <div className={classes.container}>
             <div className={classes.paper}>
              <form
                onSubmit={(e) => submitHandler(e)}
                autoComplete="off"
                className={`${classes.root} ${classes.form}`}
              >
                <Typography variant="h5">
                  <b>Update your profile</b>
                </Typography>

                <TextField
                  className={classes.textField}
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  name="fullName"
                  variant="outlined"
                  label="Full Name"
                  placeholder="Full Name"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  value={positionInput}
                  onChange={(e) => setPositionInput(e.target.value)}
                  name="position"
                  variant="outlined"
                  label="Position"
                  placeholder="Position"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  name="location"
                  variant="outlined"
                  label="Location"
                  placeholder="Location"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  value={portfolioInput}
                  onChange={(e) => setPortfolioInput(e.target.value)}
                  name="portfolio"
                  variant="outlined"
                  label="Portfolio"
                  placeholder="Portfolio"
                  fullWidth
                />
                <label htmlFor="avatar">Profile photo </label>
                <input
                  onChange={(e) => onFileChange(e)}
                  name="avatar"
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className={classes.avatarInput}
                />
                <Button
                  className={classes.buttonSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Update Information
                </Button>
              </form>
              </div>
          </div>
     </div>
  );
};
