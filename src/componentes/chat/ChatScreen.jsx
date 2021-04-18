import React,{useState, useEffect } from "react";

import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { db } from '../../firebase/firebase'
import "./chatStyle.css";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { useParams } from 'react-router-dom'


function ChatScreen( {selectedUser} ) {
    const {roomId} = useParams();
    const currentUser = useSelector((state) => state.currentUser);//usuario logueado
    const [input, setInput] =useState("");
    const [messages, setMessages] = useState([])
  
    
    const sendMessage = (e) => {
        e.preventDefault();
        
        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            roomId : roomId,
            content: input,
            senderName: currentUser.fullName,
            receiverUserId: selectedUser.id,
            senderUserId: currentUser.id,
            fromUserEmail: currentUser.email,
            toUserEmail: selectedUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        db.collection('user').doc(String(selectedUser.id)).collection('notificationMessages')
        .add({
            roomId : roomId,
            content: input,
            senderName: currentUser.fullName,
            receiverUserId: selectedUser.id,
            senderUserId: currentUser.id,
            fromUserEmail: currentUser.email,
            toUserEmail: selectedUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
       
        setInput("");
    }

    useEffect(() => {
        if ( roomId ) {

        db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [roomId]);
   
    return (
        <div className='container'>
            <div className='header'>
                <Avatar className='avatar' src={currentUser.avatar} />
               <div className='headerInfo'>
                    <h3 className='uppercase'>{`ChatRoom of ${currentUser.fullName}`}</h3>
                    <p>last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
               </div>
                <div className='headerIcons'>
                    <IconButton> <SearchOutlined /> </IconButton>
                    <IconButton> <AttachFile /> </IconButton>
                    <IconButton> <MoreVert /> </IconButton>
                </div>
            </div>
            <div className='messageContainer'>
                {messages.map((message) => (
                <p className={`chat__message ${message.senderName === currentUser.fullName && "chat__reciever"}`}>
                    <span className="chat__name">
                        {message.senderName}
                    </span>
                        {message.content}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toLocaleTimeString('en-Us')}
                    </span>
                </p>
                ))}    
            </div>
            <form onSubmit={sendMessage}>
            <div className='inputContainer'>
                <InsertEmoticonIcon/>
                
                <input className='inputInside' placeholder='Type a message...'value={input} onChange={(e)=>setInput(e.target.value)} />
                <button  disabled={!input} type='submit'onClick={sendMessage}>Send Message</button>
                <MicIcon/>
            </div>
            </form>
        </div>
    )
}

export default ChatScreen;
