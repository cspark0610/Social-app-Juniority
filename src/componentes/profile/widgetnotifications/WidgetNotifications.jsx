import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "../../sidebarDer/widgetStyle";
import { Avatar } from "@material-ui/core";

import { Link } from "react-router-dom";

const WidgetNotifications = ( { messages} ) => {
  const classes = useStyles();

  return (
    <>
      {messages.length>0 ? (
        <>
            <div className={classes.body}>
              <Paper className={classes.top}>
                  <div className={classes.heading}>
                    <h4><b>Messages notifications</b></h4>
                  </div>
                <hr />
                {messages.map(message =>(
                <div className={classes.people}  key={message.id}>
                    <div className={classes.people_left}>
                        <Avatar>{message.senderName.charAt(0)}</Avatar>
                    </div>
                    <div className={classes.people_right}>
                        <Typography><Link to={`/chat/${message.roomId}`}>{message.senderName}</Link></Typography>
                        <p style={{ color: "gray", fontSize: "11px" }}>{new Date(message.timestamp?.toDate()).toUTCString()}</p>
                        <p style={{ color: "gray", fontSize: "11px" }}>{`From ${message.senderName} to ${message.toUserEmail.split('@')[0]}`}</p>
                    </div>
               </div>
              ))}
              </Paper>
            </div>
        </>
        ) :null}
    </>    
  );
};

export default WidgetNotifications;
