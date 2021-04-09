import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  body: {
    flexDirection: "column",
    marginTop: "15px",
  },
  top: {
    borderRadius: 10,
  },
  heading: {
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
    padding: "20px",
  },
  sectionGraph: {
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 12,
    padding: "20px",
  },
  iconGraph: {
    margin: 3,
    color: "#3CB4E5",
  },
  numberGraph: {
    fontSize:10,
  },
  chartbody:{
    padding:1,
  }
});