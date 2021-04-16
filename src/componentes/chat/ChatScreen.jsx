import React,{useState, useEffect} from "react";

import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { db } from '../../firebase/firebase'
import "./chatStyle.css";
import { useSelector } from "react-redux";
import firebase from "firebase";
import Message from './Message';

import moment from 'moment';

function ChatScreen({selectedUser}) {
    
    const currentUser = useSelector((state) => state.currentUser);//usuario logueado
    const targetEmail = useSelector((state) => state.targetEmail);
    const [input, setInput] =useState("");
    const [messages, setMessages] = useState([])
    
    console.log('SELECTEDUSER',selectedUser.email);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('user').doc(currentUser.id).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },{merge:true})
        db.collection('chatsMessages')
        .add({
            content:input,
            fromUser: currentUser.email,
            toUser: targetEmail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }
    const showMessages = () => {
       // const messages = db.collection('chatsMessages').where('toUser','==', selectedUser.email)
        console.log('MESSSAGES',messages);

        return (
            <>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            </>
        )
    }


    return (
        <div className='container'>
            <div className='header'>
                <Avatar className='avatar' src={`https://img.favpng.com/0/15/12/computer-icons-avatar-male-user-profile-png-favpng-ycgruUsQBHhtGyGKfw7fWCtgN.jpg`} />
               <div className='headerInfo'>
                    <h3>{`Chat with ${targetEmail.split('@')[0]}`}</h3>
                    <p>last seen</p>
               </div>
                <div className='headerIcons'>
                    <IconButton> <SearchOutlined /> </IconButton>
                    <IconButton> <AttachFile /> </IconButton>
                    <IconButton> <MoreVert /> </IconButton>
                </div>
            </div>
            <div className='messageContainer'>
                {showMessages()}
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
