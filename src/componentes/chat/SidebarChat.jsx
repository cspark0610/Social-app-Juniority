import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Avatar } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { db } from '../../firebase/firebase'
import { useSelector, useDispatch } from "react-redux";
import { setTargetEmail } from "../../store/targetEmail";
import './sidebarChat.css'


function SidebarChat( {selectedUser }) {
    const currentUser = useSelector((state) => state.currentUser);//usuario logueado
    const [allUsers,setAllUsers] = useState([]);
    const dispatch = useDispatch();
   
    
    useEffect(() => {
        db.collection("user")
          .onSnapshot((shot) => {
            const docs = [];
            shot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            setAllUsers(docs);
          });
    }, []);
  
   
    const createChat=()=>{
        const inputEmail = prompt('enter email adress for the user you want to chat with')
        const input = inputEmail.trim().toLowerCase()
        if(!input) return null;
        if(EmailValidator.validate(input)&& input !== currentUser?.email.toLowerCase()){
            dispatch(setTargetEmail(input))

            db.collection('chatsRoom').add({
                usersChat : [currentUser.email, input],
                messages : [],
            })
        }
    }
    
    return (
        <div>
            {console.log(allUsers)}
            <div className='headerSidebar'>
                <Avatar className='avatar' style={{marginLeft:'20px'}}scr={`https://img.favpng.com/0/15/12/computer-icons-avatar-male-user-profile-png-favpng-ycgruUsQBHhtGyGKfw7fWCtgN.jpg`}/>
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
                <button className='sidebarBtn' onClick={createChat}>start a new chat</button>
            </div>
            {allUsers && allUsers.map((user)=>(
                <div className='userContainer'>
                    <p><b>{user.email}</b></p>
                </div>
            ))
            }
            
        </div>
    )
}

export default SidebarChat
