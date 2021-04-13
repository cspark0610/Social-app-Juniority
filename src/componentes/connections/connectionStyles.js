import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  main: {
    position: "relative",
    top: "70px",
    background: "lightgray",
  },
  container: {
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
    borderRadius: 5,
    color: "#B4DCD6",
    border: "solid",
    borderWidth: "3px",
    borderColor: "#162D27",
    overflow: "auto",
  },
  root: {},
  titleCard: {
    height: "100%",
    background: "#B4DCD6",
    padding: "0 20",
  },
  titleMain: {
    padding: 15,
    fontSize: "arial",
    color: "#162D27",
  },
  root: {
    background: "#E8F4F2",
    padding: "5",
  },
  delButton: {
    background: "#3CB4E5",
    border: "none",
    color: "",
  },
  nameText: {
    color: "red",
  },
  nameProfile: {
    color: "#162D27",
    fontSize: 20,
  },
  containerCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    background: "#E8F4F2",
    height: "100%",
  },
  imgCard: {
    marginTop: "auto",
    width: 90,
    height: 90,
    marginRight: 100,
  },
  nameUser: {
    marginTop: "auto",
    width: 120,
    height: 90,
    marginRight: 30,
  },
  iconoEdit:{
    color:"#B4DCD6",
  }
}));
