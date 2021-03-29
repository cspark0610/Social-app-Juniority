import React,{useEffect} from 'react'
import './App.css';
import { Switch, Route } from "react-router-dom";
import UserProfile from './componentes/sidebarIzq/UserProfile'
import Login from "./componentes/login/Login"
import Register from "./componentes/register/Register"
import Home from "./componentes/home/Home"
import { useSelector, useDispatch } from 'react-redux';
import {login, logout} from './store/userSlice.js';
import {auth} from './firebase/firebase.js';
import PasswordRecovery from "./componentes/passwordRecovery/PaswordRecovery";
import { setCurrentUser } from './store/currentUser';

function App() {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const currentUserSessionStorage = JSON.parse(sessionStorage.getItem('currentUser'));
  //https://firebase.google.com/docs/auth/web/manage-users
  //persistencia de la sesion 
  useEffect(()=>{
    auth.onAuthStateChanged( userAuth=>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          fullName:userAuth.fullName, 
          email:userAuth.email,
          //photo:userAuth.photo, 
        }))
      }else{
        dispatch(logout());
      }
    })
  },[dispatch])
  
  useEffect(() => {
    dispatch(setCurrentUser(currentUserSessionStorage))
  }, [])

  useEffect(() => {
  }, [currentUser])

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/register" component={Register} />
        <Route path="/password-recovery" component={PasswordRecovery} />
      </Switch>
    </>
  );
}

export default App;
