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
    paddingTop: "5%",
  },
  gridContainer: {
    width: "65%",
    backgroundColor: "white",
    padding: "2%",
    borderRadius: 10,
    margin: "auto",
    height: "auto",
  },
  textField: {
    marginTop: "5%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3cb4e5",
    },
  },
});
export default useStyles;
