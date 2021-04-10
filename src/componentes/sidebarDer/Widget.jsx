import React, { useState, useEffect } from "react";
import {  Paper, Typography } from "@material-ui/core";
import useStyles from "./widgetStyle.js";
import { Avatar } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { db, auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { addFollow } from "../utils/followSystem.js";
import { Link } from "react-router-dom";

const Widget = () => {
  const [ users, setUsers ]= useState([]);
  const [ userLogueado ] = useAuthState(auth);
  const currentUser = useSelector(state => state.currentUser);
  
  useEffect(()=>{
    db.collection('user')
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
  const randomIdx4 = Math.floor(Math.random()*usersFiltered.length)
  

  const classes = useStyles();

  const handleClick = (e, user) => {
    e.preventDefault();
    db.collection('user').doc(user).get()
    .then(user => {
      addFollow(user.data(), currentUser)
    })
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
            <Avatar>{usersFiltered[randomIdx1]?.data?.fullName.charAt(0).toUpperCase()}</Avatar> 
          </div>
          <div className={classes.people_right}>
            <Typography><Link to={ `/profile/${usersFiltered[randomIdx1]?.id}` }>{usersFiltered[randomIdx1]?.data?.fullName} </Link></Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx1]?.data?.email}
            </p>
          </div>
          <div className={classes.icon}>
          <IconButton onClick={e => handleClick(e, usersFiltered[randomIdx1]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{usersFiltered[randomIdx2]?.data?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography><Link to={ `/profile/${usersFiltered[randomIdx2]?.id}` }>{usersFiltered[randomIdx2]?.data?.fullName}</Link>
              </Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx2]?.data?.email}
            </p>
          </div>
          <div className={classes.icon}>
            <IconButton onClick={e => handleClick(e, usersFiltered[randomIdx2]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{usersFiltered[randomIdx3]?.data?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography>
            <Link to={ `/profile/${usersFiltered[randomIdx3]?.id}` }>
              {usersFiltered[randomIdx3]?.data?.fullName}
              </Link></Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx3]?.data?.email}
            </p>
          </div>
          <div className={classes.icon}>
          <IconButton onClick={e => handleClick(e, usersFiltered[randomIdx3]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
        {/*repetido*/}
        <hr />
        <div className={classes.people}>
          <div className={classes.people_left}>
            <Avatar>{usersFiltered[randomIdx4]?.data?.fullName.charAt(0).toUpperCase()} </Avatar>
          </div>
          <div className={classes.people_right}>
            <Typography>
            <Link to={ `/profile/${usersFiltered[randomIdx4]?.id}` }>
              {usersFiltered[randomIdx4]?.data?.fullName}
              </Link></Typography>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {usersFiltered[randomIdx4]?.data?.email}
            </p>
          </div>
          <div className={classes.icon}>
          <IconButton onClick={e => handleClick(e, usersFiltered[randomIdx4]?.id)}>
            <PersonAddOutlinedIcon />
            </IconButton>
          </div>
        </div>
       
      </Paper>
    </div>
  );
};

export default Widget;
