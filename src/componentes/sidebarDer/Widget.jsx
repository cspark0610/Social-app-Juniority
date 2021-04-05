import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./widgetStyle.js";
import { Avatar } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { db, auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


const Widget = () => {
  const [ users, setUsers ]= useState([]);
  const [ userLogueado ] = useAuthState(auth);
  
  useEffect(()=>{
    db.collection('user').orderBy('timeStamp')
    .onSnapshot(shot =>{
      setUsers(shot.docs.map(doc =>({
            id: doc.id,
            data: doc.data(),
      })
      ))
    })
  },[]);
 
  const usersFiltered = users.filter(user => user['data'].email !== userLogueado.email )

  const randomIdx1 = Math.floor(Math.random()*usersFiltered.length)
  const randomIdx2 = Math.floor(Math.random()*usersFiltered.length)
  const randomIdx3 = Math.floor(Math.random()*usersFiltered.length)

  const classes = useStyles();
  
  return (
    <div className={classes.body}>
      <Paper className={classes.top}>
        <div className={classes.heading}>
          <h4><b>People you might know</b></h4>
        </div>
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{usersFiltered[randomIdx1]?.data?.fullName.charAt(0).toUpperCase()}</Avatar> 
          </div>
          <div className={classes.people_right}>
            <Typography>{usersFiltered[randomIdx1]?.data?.fullName}</Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx1]?.data?.email}
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
            <Avatar>{usersFiltered[randomIdx2]?.data?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography>{usersFiltered[randomIdx2]?.data?.fullName}</Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx2]?.data?.email}
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
            <Avatar>{usersFiltered[randomIdx3]?.data?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography>{usersFiltered[randomIdx3]?.data?.fullName}</Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx3]?.data?.email}
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
