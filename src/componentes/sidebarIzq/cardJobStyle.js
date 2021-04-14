import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  body: {
    /*height: "200px",*/
    display: "flex",
    flexDirection: "column",
    width: "85%",
    margin: "10px 10px",
    cursor: "pointer",
  },
  top: {
    overflow: "hidden",
    borderRadius: 10,
    background: "#E8F4F2",
    justifyContent: "row",
    alignItems: "center",
  },
  section1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  logojob: {
    width: 60,
    height: 60,
  },
  tituloJob: {
    fontsize: 14,
    color: "#162D27",
  },
  subtituloJob: {
    color: "#3CB4E5",
  },
  subtituloJob1: {
    fontSize: "12px",
  },
  logoConection: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: "2px",
  },
  conection: {
    display: "flex",
  },
  subtituloConection: {
    fontSize: "10",
  },
  divider: {
    background: "#000",
  },
}));
