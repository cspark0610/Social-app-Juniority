import React, { useEffect } from "react";

import InputMessage from "../post/InputMessage";
import Navbar from "../navbar/Navbar";
import Widget from "../sidebarDer/Widget";
import { Profile } from "../profile/perfil/Profile";
import Jobs from "../sidebarIzq/Jobs";

import { Button, Grid } from "@material-ui/core";
import { useFirebaseApp } from "reactfire";
import { useHistory } from "react-router";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/currentUser";
import "./style.css";
import { removeSelectedUserPosts } from "../../store/selectedUserPosts";
import { setSelectedUser } from "../../store/selectedUser";


const Home = () => {
  const firebase = useFirebaseApp();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      db.collection("user")
        .where("id", "==", currentUser.id)
        .get()
        .then((doc) =>
          doc.forEach((data) => {
            localStorage.setItem("currentUser", JSON.stringify(data.data()));
          })
        );
    }
  }, []);

  useEffect(() => {
    dispatch(setSelectedUser(currentUser));
    dispatch(removeSelectedUserPosts());
  }, [])

  return (
    <>
      {!currentUser ? (
        history.push("/register")
      ) : (
        <>
          <Navbar />
          <Grid
            container
            display="flex"
            align="center"
            style={{
              position: "absolute",
              top: 70,
              background: "lightgrey",
              paddingLeft: 70,
              paddingRight: 70,
            }}
            spacing={3}
          >
            <Grid item md={3} style={{ paddingTop: 100 }}>
              <Profile user={currentUser} />
              <Jobs />
            </Grid>

            <Grid item md={6}>

              <InputMessage />

            </Grid>
            <Grid item md={3}>
              <Widget />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
