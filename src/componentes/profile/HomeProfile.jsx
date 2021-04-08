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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserPosts } from "../../store/selectedUserPosts";
import TransitionsModal from '../home/TransitionModal';
import { useHistory } from 'react-router-dom';

const HomeProfile = (props) => {
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState()
  const history = useHistory();
  const locationUrl = useSelector(state => state.locationUrl);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   db.collection("posts")
  //     .where("userId", "==", userId)
  //     .get()
  //     .then((doc) => {
  //       doc.forEach((data) => {
  //         dispatch(setSelectedUserPosts({...data.data(),id: data.id}));
  //       });
  //     });
  // }, [locationUrl]);

  useEffect(() => {
    db.collection("user")
      .where("id", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => setSelectedUser(doc.data()));
      });
  }, [locationUrl]);

  useEffect(() => {
    db.collection("user")
      .where("id", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => setSelectedUser(doc.data()));
      });
    console.log(userId)
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
                <Profile user={selectedUser} setUsers={setUsers} handleOpen={handleOpen} setTitle={setTitle}/>
                <Portfolio />
              </Grid>
              <TransitionsModal
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                users={users}
                title={title}
              />
              <Grid item md={6}>
                <PostProfile user={selectedUser} />
                <Publication handleOpen={handleOpen} setTitle={setTitle} setUsers={setUsers} selectedUser={selectedUser}/>
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