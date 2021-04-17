import React,{useState, useEffect} from "react";

import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { db } from '../../firebase/firebase'
import "./chatStyle.css";
import { useSelector } from "react-redux";
import firebase from "firebase";

//import {useParams} from 'react-router-dom'


function ChatScreen( {selectedUser} ) {
    //const {roomId} = useParams();
    const currentUser = useSelector((state) => state.currentUser);//usuario logueado
    const targetEmail = useSelector((state) => state.targetEmail);
    const [input, setInput] =useState("");
    const [messages, setMessages] = useState([])
    
    // console.log('roomId',roomId); // id del selectedUSer es el roomId
     console.log('currentUSer',currentUser); // id del selectedUSer es el roomId
     console.log('selectedUser',selectedUser); // id del selectedUSer es el roomId

    //console.log('targetEmaikl', targetEmail);
    let roomId = `${currentUser.id}${selectedUser.id}`

    const sendMessage = (e) => {
        e.preventDefault();
        
        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            content:input,
            name:currentUser.fullName,
            fromUser: currentUser.email,
            toUser: targetEmail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

  useEffect(() => {
    if (currentUser.id && selectedUser.id) {

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
   
  //console.log('MESSAGES', messages);
    return (
        <div className='container'>
            <div className='header'>
                <Avatar className='avatar' src={currentUser.avatar} />
               <div className='headerInfo'>
                    <h3>{`Chat  ${targetEmail.split('@')[0]}`}</h3>
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
                <p className={`chat__message ${message.name === currentUser.fullName && "chat__reciever"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                        {message.content}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
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
