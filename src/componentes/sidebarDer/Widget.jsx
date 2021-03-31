import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./widgetStyle.js";
import { Avatar } from "@material-ui/core";
import { avatarStyle } from "../post/PostStyle.js";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import imagen from "../assets/ag.jpg";

const Widget = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Paper className={classes.top}>
        <div className={classes.heading}>
          <h4>
            <b>People you might know</b>
          </h4>
        </div>
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar src={imagen} />
          </div>
          <div className={classes.people_right}>
            <Typography>John Doe</Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              Full Stack Developer
            </p>
          </div>
          <div className={classes.icon}>
            <PersonAddOutlinedIcon />
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar src={imagen} />
          </div>
          <div className={classes.people_right}>
            <Typography>John Doe</Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              Full Stack Developer
            </p>
          </div>
          <div className={classes.icon}>
            <PersonAddOutlinedIcon />
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar src={imagen} />
          </div>
          <div className={classes.people_right}>
            <Typography>John Doe</Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              Full Stack Developer
            </p>
          </div>
          <div className={classes.icon}>
            <PersonAddOutlinedIcon />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Widget;
