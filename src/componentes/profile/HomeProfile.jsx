import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Profile } from "./perfil/Profile";
import { Portfolio } from "./portfolio/Portfolio";
import { PostProfile } from "./post/PostProfile";
import Widget from "../sidebarDer/Widget";
import { Banner } from "./banner/Banner";
import Navbar from "../navbar/Navbar";
import "./style.css";
import { Publication } from "./post/Publication";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import TransitionsModal from "../home/TransitionModal";
import { useHistory } from "react-router-dom";
import WidgetNotifications from './widgetnotifications/WidgetNotifications';
import {PersonalInfo} from './personalInfo/personalInfo'


const HomeProfile = (props) => {
  const userId = props.match.params.id;
  const [selectedUser, setSelectedUser] = useState();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState();
  const locationUrl = useSelector((state) => state.locationUrl);
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  const [messages, setMessages] = useState();

  useEffect(()=>{
    db.collection('user').doc(String(currentUser.id)).collection('notificationMessages').orderBy('timestamp', 'desc')
    .onSnapshot(shot =>{
      const docs = [];
      shot.docs.map(doc => docs.push({ ...doc.data()}));
     
      const unique = (arr , key ) =>{
        return [...new Map(arr.map(item => [item[key], item])).values()]
      }
      const uniqueMessages = unique(docs, 'fromUserEmail') 
      setMessages(uniqueMessages)
    })
  },[])
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
  }, []);

  return (
    <>
      {!currentUser ? (
        history.push("/register")
      ) : (
        <>
          {selectedUser && (
            <>
              <Navbar />

              <Grid container display="flex" align="center">
                <Grid item md={12}>
                  <Banner />
                </Grid>
              </Grid>
              <div className='home__border'>
                <Grid container display='flex' align='center' spacing={3}>
                  <Grid item md={3}>
                    <Profile user={selectedUser} setUsers={setUsers} handleOpen={handleOpen} setTitle={setTitle} />
                    <Portfolio />
                  </Grid>
                  <TransitionsModal open={open} setOpen={setOpen} handleClose={handleClose} users={users} title={title} />
                  <Grid item md={6}>
                    <PostProfile user={selectedUser} />
                    <PersonalInfo user={selectedUser}/>
                    <Publication handleOpen={handleOpen} setTitle={setTitle} setUsers={setUsers} selectedUser={selectedUser} />
                  </Grid>
                  <Grid item md={3}>
                    <div>
                      <Widget />
                      {messages ? (<WidgetNotifications messages={messages}/>) :null}
                      
                    </div>
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeProfile;
