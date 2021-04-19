import { makeStyles } from "@material-ui/core/styles";

export const avatarStyle = {
  width: "100px",
  height: "100px",
};

export default makeStyles({
  post: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBotton: "10px",
  },
  info: {
    marginLeft: "50px",
  },
  message: {
    textAlign: "justify",
    textJustify: "inter-word",
    marginBottom: '4em'
  },
  body: {
    overflowWrap: "anywhere",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  containerComment: {
    display: "flex",
    margin: "auto",
    width: "89%",
    marginBottom: "2%",
    marginTop:'3%'
  },
  containerCommentText: {
    textAlign: "start",
    backgroundColor: "#E3EFF1",
    borderRadius: "5px",
    marginLeft: "2%",
    fontSize: "85%",
    marginBottom: "3%",
  },
  titleComment: {
    fontWeight: "500",
    "&:hover": {
      borderBottom: "solid black 1px",
    },
  },
  likes: {
    "&:hover": {
      borderBottom: "solid #3cb4e5 1px",
      color: "#3cb4e5",
    },
    cursor: "pointer",
  },
  optionsIcons: {
    display: "flex",
    justifyContent: "space-between",
  },
});
