import React from "react";
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

// ver linea 59 del array para mapeaar

const Connections = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <Navbar />
      <div className={classes.main}>
        <div className={classes.containerCard}>
          <img src='https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/user-profile.png' width='50px' alt='mi avatar' className={classes.imgCard} />

          <div className={classes.nameUser}>
            <h1> Pätricio Fernandez </h1> <br />
            <h7> pato.15125 </h7>
          </div>
          <div className={classes.nameUser}>
            <h1>
              Followers <b>646</b>
            </h1>{" "}
            <br />
            <h7>
              {" "}
              Following <b>353</b>
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
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem key={value} button>
                        <ListItemAvatar>
                          <Avatar src={`/static/images/avatar/${value + 1}.jpg`} />
                        </ListItemAvatar>
                        <div className={classes.nameProfile}>Luis Fernandez</div>
                        <ListItemText className={classes.nameText} id={labelId} />

                        <ListItemSecondaryAction>
                          <Button variant='contained' className={classes.delButton} startIcon={<DeleteIcon />} size='small'>
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
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem key={value} button>
                        <ListItemAvatar>
                          <Avatar src={`/static/images/avatar/${value + 1}.jpg`} />
                        </ListItemAvatar>
                        <div className={classes.nameProfile}>aaaaaaaaaaaaaaa</div>
                        <ListItemText className={classes.nameText} id={labelId} />

                        <ListItemSecondaryAction>
                          <Button variant='contained' className={classes.delButton} size='small'>
                            Following
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
  );
};

export default Connections;
