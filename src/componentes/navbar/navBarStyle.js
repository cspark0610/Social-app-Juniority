import { fade, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  search: {
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: "70px",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    borderWidth: "3px",
    borderColor: "#3CB4E5",
    borderRadius: "3px",
    display: "flex",
  },
  searchIcon: {
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    left: 0,
  },
  inputRoot: {},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "30ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "13ch",
    },
    background: "#000",
    color: "#E8F4F2",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
      position: "relative",
      zIndex: 100,
    },
  },
}));
