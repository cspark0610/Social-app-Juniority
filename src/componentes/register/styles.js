import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bg: {
    backgroundImage: `url(
      "https://blog.trello.com/hs-fs/embrace_remote_how_global_leaders_are_approaching_remote_teamwork.png"
    )`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: `no-repeat`,
    backgroundSize: "cover",
    paddingTop: "3rem",
  },
  gridContainer: {
    width: "65%",
    backgroundColor: "white",
    padding: "2%",
    borderRadius: 10,
    margin: "auto",
    height: "auto",
    paddingTop: "0.5%",
  },
  textField: {
    marginTop: "5%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3cb4e5",
    },
  },
  checkbox: {
    "& .MuiTypography-body1": {
      lineHeight: 1,
      fontSize: "0.6rem",
      fontWeight: 300,
      letterSpacing: "0.0938em",
    },
  },
});
export default useStyles;
