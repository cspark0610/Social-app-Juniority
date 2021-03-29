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
  },
  card: {
    width: "40%",
    marginTop: "12%",
    backgroundColor: "white",
    padding: "2%",
    borderRadius: 10,
  },
});
export default useStyles;
