import React, { useEffect,useState } from "react";
import useStyles from "./formJobsStyle.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { db } from "../../../firebase/firebase.js";
import firebase from "firebase";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 170,
    },
  },
};

const FormJobs = () => {
  const classes = useStyles();
  const initialState = {
    position: "",
    salary: "",
    availability: "",
    skills: "",
    location: "",
    description: "",
  };
  const [job, setJob] = useState(initialState);
  const [itemName, setItemName] = useState("");
  const [names, setNames] = useState([]);

  const handleChange = (event) => {
    setItemName(event.target.value);
    setJob({ ...job, salary: event.target.value })
  };

  useEffect(() => {
    db.collection("PayRate")
      .orderBy("payRate", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        const filterPayRate = docs.map((doc) => doc.payRate);
        setNames(filterPayRate);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection("jobs").add({
        position: job.position,
        availability: job.availability,
        salary: job.salary,
        skills: job.skills,
        location: job.location,
        description: job.description,
        likes: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      clear();
      toast.success("Job offer created successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error(error);
    }
  };

  const clear = () => {
    setJob(initialState);
    setItemName("")
  };
  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete='off' className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <ToastContainer />
          <Typography variant='h6'>
            <b>Post your job offer</b>
          </Typography>

          <TextField
            required
            name="position"
            variant="outlined"
            label="Position"
            placeholder="Position"
            fullWidth
            value={job.position}
            onChange={(e) => setJob({ ...job, position: e.target.value })}
          />
         
            {names[0] && (
          <FormControl variant="outlined" className={classes.selectControl}>
            <InputLabel id="demo-mutiple-chip-label" className={classes.inputSelect}>Pay Rate</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple={false}
              value={itemName}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {names[0].map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  <p>{name}</p>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      )}
 
          <TextField
            required
            name="availability"
            variant="outlined"
            label="Availability"
            placeholder="Availability"
            fullWidth
            value={job.availability}
            onChange={(e) => setJob({ ...job, availability: e.target.value })}
          />
          <TextField
            required
            name="skills"
            variant="outlined"
            label="Skills"
            placeholder="Skills (Space Separeted)"
            fullWidth
            value={job.skills}
            onChange={(e) => setJob({ ...job, skills: e.target.value })}
          />
          <TextField
            required
            name="location"
            variant="outlined"
            label="Location"
            placeholder="Location"
            fullWidth
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
          />
          <TextField
            required
            name="description"
            variant="outlined"
            label="Description"
            placeholder="Description"
            multiline
            fullWidth
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
          />

          <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
            Submit
          </Button>
          <Button className={classes.buttonClear} variant='contained' color='secondary' size='small' fullWidth onClick={clear}>
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default FormJobs;
