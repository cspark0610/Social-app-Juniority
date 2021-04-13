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
import DeleteIcon from "@material-ui/icons/Delete";

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
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.card}>
          <div className={classes.titleCard}>
            <div className={classes.titleMain}> titulo</div>
            <List dense className={classes.root}>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} button>
                    <ListItemAvatar>
                      <Avatar src={`/static/images/avatar/${value + 1}.jpg`} />
                    </ListItemAvatar>

                    <ListItemText
                      className={classes.nameText}
                      id={labelId}
                      primary={` name fullname ${value + 1} `}
                    />

                    <ListItemSecondaryAction>
                      <Button
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
            <div>titulo</div>
            <div className={classes.root}>
              <List dense className={classes.root}>
                {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem key={value} button>
                      <ListItemAvatar>
                        <Avatar
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={` name fullname ${value + 1}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="delete"
                          className={classes.delButton}
                        >
                          <DeleteIcon />
                        </IconButton>
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
  );
};

export default Connections;
