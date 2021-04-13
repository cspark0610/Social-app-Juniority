import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Register from "./componentes/register/Register";
import Home from "./componentes/home/Home";
import { useSelector, useDispatch } from "react-redux";
//import { login, logout } from "./store/userSlice.js";
//import { auth } from "./firebase/firebase.js";
import PasswordRecovery from "./componentes/passwordRecovery/PaswordRecovery";
import { setCurrentUser } from "./store/currentUser";
import HomeProfile from "./componentes/profile/HomeProfile";
import HomeJobs from "./componentes/jobs/HomeJobs";
import { Configuration } from "./componentes/profile/configuration/Configuration";
import Courses from "./componentes/courses/Courses";

function App() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const locationUrl = useSelector((state) => state.locationUrl);
  const currentUserlocalStorage = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {}, [locationUrl]);

  useEffect(() => {
    dispatch(setCurrentUser(currentUserlocalStorage));
  }, []);

  useEffect(() => {}, [currentUser]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile/configuration" component={Configuration} />
        <Route
          path="/profile/:id"
          render={({ match }) => <HomeProfile match={match} />}
        />
        <Route path="/register" component={Register} />
        <Route path="/password-recovery" component={PasswordRecovery} />
        <Route path="/jobs" component={HomeJobs} />
        <Route path="/courses" component={Courses} />
      </Switch>
    </>
  );
}

export default App;
