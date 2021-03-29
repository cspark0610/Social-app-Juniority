import React from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './widgetStyle.js';
import RecordIcon from "@material-ui/icons/FiberManualRecord";


const Widget = () => {
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <Paper className={classes.top}>
                <div className={classes.heading}>
                    <RecordIcon/>
                    <h4><b>People you might know</b></h4>
                </div>
                <hr/>
               
            </Paper>
        </div>
    )
}

export default Widget

