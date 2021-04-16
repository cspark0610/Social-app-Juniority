import React, { useEffect, useState } from "react";
import InputMessage from "../post/InputMessage";
import Navbar from "../navbar/Navbar";
import Widget from "../sidebarDer/Widget";
import GraphViews from "../sidebarDer/GraphViews";
import { Profile } from "../profile/perfil/Profile";
import Jobs from "../sidebarIzq/Jobs";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { removeSelectedUserPosts } from "../../store/selectedUserPosts";
import { setSelectedUser } from "../../store/selectedUser";
import TransitionsModal from "../home/TransitionModal";



const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
  }, []);

  return (
    <>
      {!currentUser ? (
        history.push("/register")
      ) : (
        <>
          <Navbar />
          <Grid container display='flex' align='center'
            style={{position:"absolute",top: 70,background: "lightgrey",paddingLeft: 70,paddingRight: 70,}}spacing={3}>
            <Grid item md={3} style={{ paddingTop: 100 }}>
              <Profile user={currentUser} setUsers={setUsers} handleOpen={handleOpen} setTitle={setTitle} />
              <Jobs title={'Courses'} type={'courses'}/>
            </Grid>

            <Grid item md={6}>
              <TransitionsModal open={open} handleClose={handleClose} users={users} title={title} />
              <InputMessage />
            </Grid>

            <Grid item md={3} >
              <div>
                <Widget/>
                <GraphViews/>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
