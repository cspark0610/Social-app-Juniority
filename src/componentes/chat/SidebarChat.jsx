import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Avatar } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import { db } from '../../firebase/firebase'
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import './sidebarChat.css'


function SidebarChat( ) {
    const currentUser = useSelector((state) => state.currentUser);//usuario logueado
    const [allUsers,setAllUsers] = useState([]);
   
    useEffect(() => {
        db.collection("user")
          .onSnapshot((shot) => {
            const docs = [];
            shot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            const filtered = docs.filter(doc => doc.email !== currentUser.email)
            setAllUsers(filtered);
          });
    }, []);
  
   
    
    return (
        <div>
           
            <div className='headerSidebar'>
                <Link to={`/profile/${currentUser.id}`}>
                    <Avatar className='avatar'style={{marginLeft:'20px'}}><KeyboardBackspaceIcon /></Avatar>
                </Link>
               
                <div>
                    <Link to='/'><IconButton><HomeIcon /></IconButton></Link>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className='search'>
                <SearchIcon />
                <input className='inputSearch' placeholder='Search chats...'/>
            </div>
            <div className='sidebarContainerBtn'>
                <button className='sidebarBtn'>list of all users</button>
            </div>
            {allUsers && allUsers.map((user)=>(
                <div className='userContainer' key={user.id}>
                    <p> <span><b>{user.email}</b></span></p>
                </div>
            ))
            }
            
        </div>
    )
}

export default SidebarChat
