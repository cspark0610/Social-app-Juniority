import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "../../sidebarDer/widgetStyle";
import { Avatar } from "@material-ui/core";
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const WidgetNotifications = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);
  const [notificationMessages, setNotificationMessages] = useState([]);

  useEffect(() => {
    db.collection('user').doc(currentUser.id).collection('notificationMessages')
    .onSnapshot(snapshot =>{
      const docs = [];
      snapshot.docs.map(doc => docs.push({ ...doc.data(), id: doc.id }));
      const filtered = docs.filter(doc => doc.fromUserEmail !== doc.toUserEmail)
      setNotificationMessages(filtered);
    })
  },[]);
  console.log('NOTIFICATION MESSAGES', notificationMessages);

  return (
    <>
      {notificationMessages.length>0 ? (
        <>
            <div className={classes.body}>
              <Paper className={classes.top}>
                  <div className={classes.heading}>
                    <h4><b>People who sent you messages</b></h4>
                  </div>
                <hr />
                {notificationMessages.map(not =>(
                <div className={classes.people}  key={not.id}>
                    <div className={classes.people_left}>
                        <Avatar>{not.senderName.charAt(0)}</Avatar>
                    </div>
                    <div className={classes.people_right}>
                        <Typography><Link to={`/chat/${not.roomId}`}>{not.senderName}</Link></Typography>
                        <p style={{ color: "gray", fontSize: "11px" }}>{not.fromUserEmail}</p>
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
