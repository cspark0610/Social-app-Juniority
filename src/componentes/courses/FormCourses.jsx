import React, { useState } from "react";
import useStyles from "../jobs/offerjobs/formJobsStyle";
import { db } from "../../firebase/firebase";
import firebase from "firebase";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormCourses = () => {
  const classes = useStyles();
  const initialState = {
    name: "",
    hours: "",
    link: "",
    technologies: "",
    description: "",
  };

  const [course, setCourse] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    db.collection("courses")
      .add({
        name: course.name,
        description: course.description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        technologies: course.technologies,
        link: course.link,
        hours: course.hours,
      })
      .then(() => console.log("exitoso"));
    setCourse(initialState);
  };

  const clear = () => {
    setCourse(initialState);
  };
  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <ToastContainer />
          <Typography variant="h6">
            <b>Post your Course</b>
          </Typography>

          <TextField
            name="Course Name"
            variant="outlined"
            label="Course Name"
            placeholder="Course Name"
            fullWidth
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            required
          />
          <TextField
            name="hours"
            variant="outlined"
            label="Hrs of Course"
            placeholder="Hrs of Course"
            fullWidth
            value={course.hours}
            onChange={(e) => setCourse({ ...course, hours: e.target.value })}
            required
          />
          <TextField
            name="link"
            variant="outlined"
            label="Link to your course"
            placeholder="Link to your course"
            fullWidth
            value={course.link}
            onChange={(e) => setCourse({ ...course, link: e.target.value })}
            required
          />
          <TextField
            name="What you will teach"
            variant="outlined"
            label="Technologies"
            placeholder="Technologies"
            fullWidth
            value={course.technologies}
            onChange={(e) =>
              setCourse({ ...course, technologies: e.target.value })
            }
            required
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            placeholder="Description"
            multiline
            fullWidth
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            required
          />

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className={classes.buttonClear}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default FormCourses;
