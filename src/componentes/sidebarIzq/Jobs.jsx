import React from "react";
import useStyles from "./jobsStyle";
import { Paper } from "@material-ui/core";
 import CardJob from "./CardJob";

export default function Jobs() {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Paper className={classes.top}>
        <div className={classes.heading}>
          <h4>
            <b>Job offers</b>
          </h4>
        </div>
        <hr />
        <div>
          <CardJob />
        </div>
      </Paper>
    </div>
  );
}
