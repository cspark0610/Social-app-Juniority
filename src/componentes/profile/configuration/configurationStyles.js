import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  mainContainer: {
    background: "lightgrey",
    height: "100vh",
  },
  container: {
    position: "relative",
    top: "70px",
    padding: 50,
    background: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  paper: {
    height: "40%",
    width: "50%",
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
    background: "#E8F4F2",
    padding: 50,
    top: "50%",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  textField: {
 
  },
  avatarInput: {
   },
  buttonSubmit: {
    margin: "10px 0",
    "&:hover": {
      backgroundColor: "#3cb4e5",
    },
  },
  textArea: {
    width: '100%'
  },
  experience: {
    display: 'inline'
  },
  experienceButt: {
    marginLeft: '43em'
  },
  textFieldExperienceForm: {
    display: 'inline',
  },
  submitExperience: {
    marginLeft: '20em'
  }
}));
