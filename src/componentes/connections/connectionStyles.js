import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  container: {
    background: "lightgray",
    height: "100vh",
  },
  subContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  card: {
    width: "40%",
    height: "300px",
    background: "yellow",
    margin: 20,
    overflow: "auto",
    borderRadius: 10,
    color: "#B4DCD6",
    border:"solid",
    borderWidth:"3px",
    borderColor:"#3CB4E5"
  },
  titleCard: {
    height: "100%",
    background: "#B4DCD6",
    padding: "0 20",
  },
  titleMain:{
    padding:15,
    fontSize:"arial",
    color:"#162D27"
  },
  root: {
    background: "#E8F4F2",
    padding: "5",
  },
  delButton: {
    background: "#B4DCD6",
    border: "none",
  },
  nameText:{

  }

  
}));
