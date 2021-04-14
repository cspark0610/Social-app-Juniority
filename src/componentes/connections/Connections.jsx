import React, { useEffect, useState } from "react";
import useStyles from "./connectionStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { db } from "../../firebase/firebase";
import { removeFollower, unFollow } from "../utils/followSystem";

// ver linea 59 del array para mapeaar

const Connections = ({ user }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    db.collection("user")
      .where("id", "==", user.id)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setCurrentUser(doc.data());
        });
      });
  }, []);

  const handleToggle = (value) => async () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const clickHandler = (e, user, order) => {
    e.preventDefault();

    if (order === "UNFOLLOW") {
      db.collection("user")
        .doc(user.id)
        .get()
        .then((doc) => {
          unFollow(doc.data(), currentUser);
        });
    } else {
      db.collection('user').doc(user.id).get()
      .then(doc => {
        console.log(doc)
        removeFollower(doc.data(), currentUser);
      });
    }
  };

  return (
    <>
      {currentUser && (
        <>
          <Navbar />
          <div className={classes.main}>
            <div className={classes.containerCard}>
              <img
                src={currentUser.avatar}
                width="50px"
                alt="mi avatar"
                className={classes.imgCard}
              />

              <div className={classes.nameUser}>
                <h1> {currentUser.fullName} </h1> <br />
                <h7> {currentUser.email} </h7>
              </div>
              <div className={classes.nameUser}>
                <h1>
                  Followers <b>{currentUser.followers.length}</b>
                </h1>{" "}
                <br />
                <h7>
                  {" "}
                  Following <b>{currentUser.follow.length}</b>
                </h7>
              </div>
              <Link to="/profile/configuration">
                <IconButton aria-label="delete" className={classes.margin}>
                  <EditIcon className={classes.iconoEdit} fontSize="large" />
                </IconButton>
              </Link>
            </div>
            <div className={classes.container}>
              <div className={classes.subContainer}>
                <div className={classes.card}>
                  <div className={classes.titleCard}>
                    <div className={classes.titleMain}>
                      <b>Followers</b>
                    </div>
                    <List dense className={classes.root}>
                      {currentUser.followers.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem key={value} button>
                            <ListItemAvatar>
                              <Avatar src={value.avatar} />
                            </ListItemAvatar>
                            <div className={classes.nameProfile}>
                              {value.fullName}
                            </div>
                            <ListItemText
                              className={classes.nameText}
                              id={labelId}
                            />

                            <ListItemSecondaryAction>
                              <Button
                                onClick={(e) => clickHandler(e, value, 'REMOVE_FOLLOWER')}
                                variant="contained"
                                className={classes.delButton}
                                startIcon={<DeleteIcon />}
                                size="small"
                              >
                                Remove
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </div>
                <div className={classes.card}>
                  <div className={classes.titleCard}>
                    <div className={classes.titleMain}>
                      {" "}
                      <b>Following</b>
                    </div>
                    <List dense className={classes.root}>
                      {currentUser.follow.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem key={value} button>
                            <ListItemAvatar>
                              <Avatar src={value.avatar} />
                            </ListItemAvatar>
                            <div className={classes.nameProfile}>
                              {value.fullName}
                            </div>
                            <ListItemText
                              className={classes.nameText}
                              id={labelId}
                            />
                            <ListItemSecondaryAction>
                              <Button
                                onClick={(e) => clickHandler(e, value, 'UNFOLLOW')}
                                variant="contained"
                                className={classes.delButton}
                                size="small"
                              >
                                UNFOLLOW
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Connections;
