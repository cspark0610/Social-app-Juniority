import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "../../sidebarDer/widgetStyle";
import { Avatar } from "@material-ui/core";
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const WidgetNotifications = () => {
  const classes = useStyles();
  const roomId = useSelector((state) => state.roomId);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if(roomId){
      db.collection('rooms').doc(roomId).collection('messages')
      .onSnapshot(snapshot =>{
        const docs = [];
        snapshot.docs.map(doc => docs.push({ ...doc.data(), id: doc.id }));
       
        setMessages(docs);
      })
    }
  },[]);
  //console.log('busqueda messagges por roomId', messages);

  return (
    <>
      {messages.length>0 ? (
        <>
            <div className={classes.body}>
              <Paper className={classes.top}>
                  <div className={classes.heading}>
                    <h4><b>People who sent you messages</b></h4>
                  </div>
                <hr />
                {messages.map(message =>(
                <div className={classes.people}  key={message.id}>
                    <div className={classes.people_left}>
                        <Avatar>{message.senderName.charAt(0)}</Avatar>
                    </div>
                    <div className={classes.people_right}>
                        <Typography><Link to={`/chat/${roomId}`}>{message.senderName}</Link></Typography>
                        <p style={{ color: "gray", fontSize: "11px" }}>{new Date(message.timestamp?.toDate()).toUTCString()}</p>
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
