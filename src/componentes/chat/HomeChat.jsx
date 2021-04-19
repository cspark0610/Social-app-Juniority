import React,{ useState,useEffect } from 'react';
import SidebarChat from "./SidebarChat";
import ChatScreen from "./ChatScreen";
import { db } from '../../firebase/firebase'
import "./homeChat.css"
import { useLocation } from 'react-router-dom';

const HomeChat = (props) => {
    
    const location = useLocation();
    const [selectedUser, setSelectedUser] = useState();
  
    useEffect(() => {
        db.collection("user")
          .where("id", "==", location.pathname.slice(-28))
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => setSelectedUser(doc.data()));
          });
    }, []);
    

    return (
        <div className='home'>
            <SidebarChat />
            <div className='chatContainer'>
            <ChatScreen selectedUser={selectedUser}/>
            </div>
        </div>
    )
}

export default HomeChat
