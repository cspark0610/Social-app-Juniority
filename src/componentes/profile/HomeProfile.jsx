import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Profile } from "./perfil/Profile";
import { Portfolio } from "./portfolio/Portfolio";
import { PostProfile } from "./post/PostProfile";
import { Widget } from "./widget/Widget";
import { Banner } from "./banner/Banner";
import Navbar from "../navbar/Navbar";
import "./style.css";
import { Publication } from "./post/Publication";
import { db } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { setSelectedUserPosts } from "../../store/selectedUserPosts";

const HomeProfile = (props) => {
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    db.collection("posts")
      .where("userId", "==", userId)
      .get()
      .then((doc) => {
        doc.forEach((data) => {
          dispatch(setSelectedUserPosts(data.data()));
        });
      });
  }, []);

  useEffect(() => {
    db.collection("user")
      .where("id", "==", userId)
      .get()
      .then((doc) => {
        doc.forEach((data) => {
          setSelectedUser(data.data());
        });
      });
  }, []);
  return (
    <>
      {selectedUser && (
        <>
          <Navbar />

          <Grid container display="flex" align="center">
            <Grid item md={12}>
              <Banner />
            </Grid>
          </Grid>
          <div className="home__border">
            <Grid container display="flex" align="center" spacing={3}>
              <Grid item md={3}>
                <Profile user={selectedUser} />
                <Portfolio />
              </Grid>

              <Grid item md={6}>
                <PostProfile />
                <Publication user={selectedUser} />
              </Grid>

              <Grid item md={3}>
                <Widget />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default HomeProfile;
