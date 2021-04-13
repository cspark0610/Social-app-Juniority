import React, { useState, useEffect } from "react";
import useStyles from "./widgetStyle.js";
import {  Paper, Typography } from "@material-ui/core";


const Graph = () => {
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <Paper className={classes.top}>
                <div className={classes.heading}>
                    <h4><b>Likes and comments Chart</b></h4>
                </div>
                <hr />
                <div className={classes.chart}>
                    <Typography> CHART </Typography>
                </div>
            </Paper>
        </div>
    )
}

export default Graph;
