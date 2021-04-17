import React,{ useState,useEffect } from 'react';
import SidebarChat from "./SidebarChat";
import ChatScreen from "./ChatScreen";
import { db } from '../../firebase/firebase'
import "./homeChat.css"
import { useLocation } from 'react-router-dom';

const HomeChat = (props) => {
    
    const location = useLocation();
    console.log('location', location.pathname.slice(-28));

    const [selectedUser, setSelectedUser] = useState();
    //seteo al selectedUser como el usuario con quien yo quiero chatear

    useEffect(() => {
        db.collection("user")
          .where("id", "==", location.pathname.slice(-28))
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => setSelectedUser(doc.data()));
          });
    }, []);
    //console.log('SELECTED USER DESDE HOMECHAT', selectedUser);

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
