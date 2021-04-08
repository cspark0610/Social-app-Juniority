import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  container: {
    position: 'relative',
    top: '20em',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  subContainer: {
    width: '50%'
  },
  paper: {
    overflow: "hidden",
    borderRadius: 10,
    background: "#E8F4F2",
    justifyContent: "row",
    alignItems: "center",
    padding: '20px',
  },
  buttonSubmit: {
    marginBottom: 10,
    width: '97%',
    margin: '10px 0',
    '&:hover':{
      backgroundColor:'#3cb4e5',
    }
  }
}));
