import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./graphViewsStyle";
import Graph from "./Graph";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssessmentIcon from "@material-ui/icons/Assessment";



const GraphViewsProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Paper className={classes.top}>
        <div className={classes.heading}>
          <h4>
            <b>Views profile</b>
          </h4>
        </div>
        <hr />
        <div className={classes.sectionGraph}>
          <div>
            Last 7 days
            <BarChartIcon fontSize="large" className={classes.iconGraph} />
            <div className={classes.numberGraph}>
              {" "}
              <b>39</b> Visits{" "}
            </div>
          </div>
          <div>
            In the month
            <AssessmentIcon fontSize="large" className={classes.iconGraph} />
            <div className={classes.numberGraph}>
              {" "}
              <b>+57,3%</b> Posts{" "}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <Graph />{" "}
        </div>
      </Paper>
    </div>
  );
};
export default GraphViewsProfile;
