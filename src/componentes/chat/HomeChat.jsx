import React,{ useState,useEffect } from 'react';
import SidebarChat from "./SidebarChat";
import ChatScreen from "./ChatScreen";
import { db } from '../../firebase/firebase'
import "./homeChat.css"

const HomeChat = (props) => {
    const userId = props.match.params.roomId;
    //console.log(userId);

    const [selectedUser, setSelectedUser] = useState();
    //seteo al selectedUser como el usuario con quien yo quiero chatear

    useEffect(() => {
        db.collection("user")
          .where("id", "==", userId)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => setSelectedUser(doc.data()));
          });
    }, []);
  

    return (
        <div className='home'>
            <SidebarChat selectedUser={selectedUser}/>
            <div className='chatContainer'>
            <ChatScreen selectedUser={selectedUser}/>
            </div>
        </div>
    )
}

export default HomeChat
