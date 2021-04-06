import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ handleClose, open, users, title }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2
              id="transition-modal-title"
              style={{ textAlign: "center", fontWeight: "600" }}
            >
              {title}
            </h2>
            <p id="transition-modal-description">
              {users.map((user) => (
                <div style={{ display: "flex" }}>
                  <Avatar src={user.photo} />
                  <Link to={`/profile/${user.userId}`}>{user.userName}</Link>
                </div>
              ))}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
