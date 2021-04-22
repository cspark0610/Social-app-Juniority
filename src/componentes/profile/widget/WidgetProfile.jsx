import React, { useState, useEffect } from "react";
import {  Paper, Typography } from "@material-ui/core";
import useStyles from "../../sidebarDer/widgetStyle.js";
import { Avatar } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { db } from '../../../firebase/firebase'

import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { addFollow } from "../../utils/followSystem.js";
import randomUniqueNum from '../../sidebarDer/randomUnique';


const Widget = () => {
  
  const classes = useStyles();
  const [ users, setUsers ]= useState([]);
  const currentUser = useSelector(state => state.currentUser);


  useEffect(()=>{
    db.collection('user')
    .onSnapshot(shot =>{
      const docs = [];
      shot.docs.map(doc => docs.push({ ...doc.data(), id: doc.id }));
      const usersFiltered = docs.filter(user => user.email !== currentUser.email )
      setUsers(usersFiltered)
    })
  },[]);

  let usersLength = users.length>0 ? users.length : 0;
  const randomArr = randomUniqueNum( usersLength-1 , 4 )
  
  const handleClick = (e, user) => {
    e.preventDefault();
    let targetUser;

    db.collection('user').doc(user).get()
    .then(user => {
      targetUser = user.data();
    }).then(
      db.collection('user').doc(currentUser.id).get()
      .then(user => {
        addFollow(targetUser, user.data());
      })
    )
  }

  
  return (
   
    <div className={classes.body}>
      <Paper className={classes.top}>
        <div className={classes.heading}>
          <h4><b>People you might know</b></h4>
        </div>
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{users[randomArr[0]]?.fullName.charAt(0).toUpperCase()}</Avatar> 
          </div>
          <div className={classes.people_right}>
            <Typography><button > {users[randomArr[0]]?.fullName} </button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
              {users[randomArr[0]]?.email}
            </p>
          </div>
          <div className={classes.icon}>
          <IconButton onClick={e => handleClick(e, users[randomArr[0]]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{users[randomArr[1]]?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography>
            <button  >{users[randomArr[1]]?.fullName} </button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
              {users[randomArr[1]]?.email}
            </p>
          </div>
          <div className={classes.icon}>
            <IconButton onClick={e => handleClick(e, users[randomArr[1]]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{users[randomArr[2]]?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography><button>{users[randomArr[2]]?.fullName}</button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
                {users[randomArr[2]]?.email}
            </p>
          </div>
          <div className={classes.icon}>
          <IconButton onClick={e => handleClick(e, users[randomArr[2]]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{users[randomArr[3]]?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography><button>{users[randomArr[3]]?.fullName}</button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
              {users[randomArr[3]]?.email}
            </p>
          </div>
          <div className={classes.icon}>
          <IconButton onClick={e => handleClick(e, users[randomArr[3]]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
       
      </Paper>
    </div>
  );
};

export default Widget;
