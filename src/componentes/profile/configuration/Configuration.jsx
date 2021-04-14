import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import Navbar from "../../navbar/Navbar";
import useStyles from "./configurationStyles";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../../../store/currentUser";
import AddIcon from "@material-ui/icons/Add";

export const Configuration = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState();
  const [fullNameInput, setFullNameInput] = useState();
  const [locationInput, setLocationInput] = useState();
  const [positionInput, setPositionInput] = useState();
  const [portfolioInput, setPortfolioInput] = useState();
  const [aboutMeInput, setAboutMeInput] = useState();
  const [experience, setExperience] = useState([]);
  const [experienceCompanyInput, setExperienceCompanyInput] = useState();
  const [experiencePositionInput, setExperiencePositionInput] = useState();
  const [experienceLocationInput, setExperienceLocationInput] = useState();
  const [experienceStartDate, setExperienceStartDate] = useState();
  const [experienceFinishDate, setExperienceFinishDate] = useState();
  const [showExperienceForm, setShowExperienceForm] = useState();
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
    setAboutMeInput(currentUser.aboutMe);
    setImageUrl(currentUser.avatar);
    setExperience(currentUser.experience);
  }, [currentUser]);

  useEffect(() => {}, [experience]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let updatedUser = { ...currentUser };

    updatedUser.fullName = fullNameInput;
    updatedUser.location = locationInput;
    updatedUser.position = positionInput;
    updatedUser.avatar = imageUrl;
    updatedUser.portfolio = portfolioInput;
    updatedUser.aboutMe = aboutMeInput;
    updatedUser.experience = experience;

    await db.collection("user").doc(currentUser.id).set(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    history.push(`/profile/${currentUser.id}`);
  };

  const addClickHandler = (e) => {
    e.preventDefault();
    setShowExperienceForm(true);
  };

  const experienceSubmitHandler = (e) => {
    e.preventDefault();

    const experienceObj = {};

    experienceObj.company = experienceCompanyInput;
    experienceObj.position = experiencePositionInput;
    experienceObj.location = experienceLocationInput;
    experienceObj.startDate = experienceStartDate;
    experienceObj.finishDate = experienceFinishDate;

    setExperience((state) => [...state, experienceObj]);
    setShowExperienceForm(false);
    setExperienceCompanyInput();
    setExperiencePositionInput();
    setExperienceLocationInput();
    setExperienceStartDate();
    setExperienceFinishDate();
    setShowExperienceForm();
  };

  return (
    <div className={classes.mainContainer}>
      <Navbar></Navbar>
      <div className={classes.container}>
        <div className={classes.paper}>
          <form onSubmit={(e) => submitHandler(e)} autoComplete='off' className={`${classes.root} ${classes.form}`}>
            <Typography variant='h5'>
              <b>Update your profile</b>
            </Typography>
            <TextField className={classes.textField} value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} name='fullName' variant='outlined' label='Full Name' placeholder='Full Name' fullWidth />
            <TextField className={classes.textField} value={positionInput} onChange={(e) => setPositionInput(e.target.value)} name='position' variant='outlined' label='Position' placeholder='Position' fullWidth />
            <TextField className={classes.textField} value={locationInput} onChange={(e) => setLocationInput(e.target.value)} name='location' variant='outlined' label='Location' placeholder='Location' fullWidth />
            <TextField className={classes.textArea} value={aboutMeInput} id='outlined-multiline-static' label='About me' onChange={(e) => setAboutMeInput(e.target.value)} multiline rows={4} variant='outlined' />
            <h5 className={classes.experience}>Experience</h5>{" "}
            <button onClick={(e) => addClickHandler(e)} className={(classes.experience, classes.experienceButt)}>
              <AddIcon></AddIcon>
            </button>
            {experience.length
              ? experience.map((job) => {
                  return (
                    <>
                      <h6>{`- ${job.company}: ${job.startDate} - ${job.finishDate}`}</h6>
                    </>
                  );
                })
              : null}
            {showExperienceForm ? (
              <>
                <TextField id='outlined-helperText' onChange={(e) => setExperienceCompanyInput(e.target.value)} value={experienceCompanyInput} label='Company' variant='outlined' />
                <TextField id='outlined-helperText' onChange={(e) => setExperiencePositionInput(e.target.value)} value={experiencePositionInput} label='Position' variant='outlined' />
                <TextField id='outlined-helperText' onChange={(e) => setExperienceLocationInput(e.target.value)} value={experienceLocationInput} label='Location' variant='outlined' />
                <TextField id='outlined-helperText' onChange={(e) => setExperienceStartDate(e.target.value)} value={experienceStartDate} label='Start date' variant='outlined' />
                <TextField id='outlined-helperText' onChange={(e) => setExperienceFinishDate(e.target.value)} value={experienceFinishDate} label='Finish date' variant='outlined' />
                <Button className={classes.submitExperience} variant='contained' onClick={(e) => experienceSubmitHandler(e)} color='primary' size='large' type='submit'>
                  Add experience
                </Button>
              </>
            ) : null}
            <TextField className={classes.textField} value={portfolioInput} onChange={(e) => setPortfolioInput(e.target.value)} name='portfolio' variant='outlined' label='Portfolio' placeholder='Portfolio' fullWidth />
            <label htmlFor='avatar'>Profile photo </label>
            <input onChange={(e) => onFileChange(e)} name='avatar' accept='image/*' id='icon-button-file' type='file' className={classes.avatarInput} />
            <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
              Update Information
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
