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
import { useSelector } from "react-redux";


const Connections = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const currentUser = useSelector(state => state.currentUser);
  const [actualUser, setactualUser] = useState();

  useEffect(() => {
    if(currentUser) {
      db.collection("user")
      .where("id", "==", currentUser.id)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setactualUser(doc.data());
        });
      });
    };
  }, [currentUser]);

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
          unFollow(doc.data(), actualUser);
        });
    } else {
      db.collection("user")
        .doc(user.id)
        .get()
        .then((doc) => {
          removeFollower(doc.data(), actualUser);
        });
    };
  };

  return (
    <>
      {actualUser && (
        <>
          <Navbar />
          <div className={classes.main}>
            <div className={classes.containerCard}>
              <img src={actualUser.avatar} width='50px' alt='mi avatar' className={classes.imgCard} />

              <div className={classes.nameUser}>
                <div>
                  <h1 className={classes.nameSpace}> {actualUser.fullName} </h1> <br />
                  <h7 className={classes.correoSpace}> {actualUser.email} </h7>
                </div>
              </div>
              <div className={classes.nameUser}>
                <h1>
                  Followers <b>{actualUser.followers.length}</b>
                </h1>{" "}
                <br />
                <h7>
                  {" "}
                  Following <b>{actualUser.follow.length}</b>
                </h7>
              </div>
              <Link to='/profile/configuration'>
                <IconButton aria-label='delete' className={classes.margin}>
                  <EditIcon className={classes.iconoEdit} fontSize='large' />
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
                      {actualUser.followers.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem key={value} button>
                            <ListItemAvatar>
                              <Avatar src={value.avatar} />
                            </ListItemAvatar>
                            <div className={classes.nameProfile}>{value.fullName}</div>
                            <ListItemText className={classes.nameText} id={labelId} />

                            <ListItemSecondaryAction>
                              <Button onClick={(e) => clickHandler(e, value, "REMOVE_FOLLOWER")} variant='contained' className={classes.delButton} startIcon={<DeleteIcon />} size='small'>
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
                      {actualUser.follow.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem key={value} button>
                            <ListItemAvatar>
                              <Avatar src={value.avatar} />
                            </ListItemAvatar>
                            <div className={classes.nameProfile}>{value.fullName}</div>
                            <ListItemText className={classes.nameText} id={labelId} />
                            <ListItemSecondaryAction>
                              <Button onClick={(e) => clickHandler(e, value, "UNFOLLOW")} variant='contained' className={classes.delButton} size='small'>
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
