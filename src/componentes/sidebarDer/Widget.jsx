import React, { useState, useEffect } from "react";
import {  Paper, Typography } from "@material-ui/core";
import useStyles from "./widgetStyle.js";
import { Avatar } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { db, auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFollow } from "../utils/followSystem.js";
import { Link, useHistory } from "react-router-dom";
import { setLocationUrl } from "../../store/locationUrl.js";

const Widget = () => {
  const history = useHistory();
  const classes = useStyles();
  const [ users, setUsers ]= useState([]);
  const [ userLogueado ] = useAuthState(auth);
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const locationUrl = useSelector(state => state.locationUrl);

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

  const randomIdx1 = usersFiltered ? Math.floor(Math.random()*usersFiltered.length) :null
  const randomIdx2 = usersFiltered ? Math.floor(Math.random()*usersFiltered.length) :null
  const randomIdx3 = usersFiltered ? Math.floor(Math.random()*usersFiltered.length) :null
  const randomIdx4 = usersFiltered ? Math.floor(Math.random()*usersFiltered.length):null
  
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

  const userClick = (e, id) => {
    e.preventDefault();
    history.push(`/profile/${id}`);
    dispatch(setLocationUrl(!locationUrl));
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
            <Typography><button onClick={e => userClick(e, usersFiltered[randomIdx1]?.id)} >{usersFiltered[randomIdx1]?.data?.fullName} </button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
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
            <Typography>
            <button onClick={e => userClick(e, usersFiltered[randomIdx2]?.id)} >{usersFiltered[randomIdx2]?.data?.fullName} </button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
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
            <button onClick={e =>  userClick(e, usersFiltered[randomIdx3]?.id) }>
              {usersFiltered[randomIdx3]?.data?.fullName}
              </button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
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
            <button onClick={e => userClick(e, usersFiltered[randomIdx4]?.id) }>
              {usersFiltered[randomIdx4]?.data?.fullName}
              </button></Typography>
            <p style={{ color: "gray", fontSize: "11px" }}>
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
