import React,{useState, useEffect} from 'react';
import { db } from "../../firebase/firebase.js";
import firebase from "firebase";
import { Card } from '@material-ui/core';
import useStyles from './InputMessageStyle.js';
import { inputStyle } from './InputMessageStyle.js';
import { createIconStyle } from './InputMessageStyle.js';
import { useAvatarStyles } from './InputMessageStyle.js';
import CreateIcon from "@material-ui/icons/Create";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import InputOption from './InputOption';
import Post from './Post';
import { Avatar } from "@material-ui/core";
import imagen from '../assets/ag.jpg';

const InputMessage = () => {

    const [input, setInput]= useState('');
    const [posts, setPosts]= useState([]);

    const classes = useStyles();
    const avatarClasses = useAvatarStyles();


    const handleSubmit =(e)=>{
        //https://medium.com/firebase-developers/the-secrets-of-firestore-fieldvalue-servertimestamp-revealed-29dd7a38a82b
        e.preventDefault();
        db.collection('posts').add({
            name:'alan',
            description :'description',
            message: input,
            photo: 'https://pbs.twimg.com/profile_images/1353676146844565505/QpmdpDvT_400x400.jpg',
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        }).then(()=>console.log('post succesfully created!!!'))
        .catch(err=>console.log(err))

        setInput('');
    };
    useEffect(()=> {
        //https://firebase.google.com/docs/firestore/query-data/listen
        db.collection('posts').orderBy('timestamp','desc')
        .onSnapshot(snapshot=>{
            console.log(snapshot.docs);
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    },[]);
    
    
    return (
        <div className='min-h-screen max-w-full my-3.5 shadow-xl'>
                <div className={classes.optionsIcons}>
                    <InputOption Icon={ShareOutlinedIcon} title='Share Update' color='#ADD8E6'/>
                    <InputOption Icon={ImageOutlinedIcon} title='Upload a photo' color='#ADD8E6'/>
                    <InputOption Icon={SaveOutlinedIcon} title='Write an article' color='#ADD8E6'/>
                </div>
            <Card className={classes.container}>
                <div className={classes.container_input}>
                    <Avatar className={avatarClasses.large} src={imagen}/>
                    
                    <form onSubmit={handleSubmit} style={{display:'flex', width:'100%'}} >
                        <CreateIcon style={createIconStyle}/>
                        <input placeholder='Write your thoughts...' type='text' value={input}
                         onChange={(e) => setInput(e.target.value)} style={inputStyle}/>
                        <button type='submit' onClick={handleSubmit}><SendOutlinedIcon style={{color:'#ADD8E6'}}/></button>
                    </form>
                </div>
            </Card>
           {console.log(posts)}
           {posts.map( ({id, data: {name, message, photo,timestamp} })=>(
               <Post 
               key={id}
               name={name}
               message={message}
               photo={photo}
               timestamp={timestamp}
               />

           ))}
        </div>
    )
}

export default InputMessage
