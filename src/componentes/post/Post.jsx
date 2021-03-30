import React from 'react';
import { Avatar } from "@material-ui/core";
import useStyles from './PostStyle.js';
import { avatarStyle } from './PostStyle.js';
import imagen from '../assets/ag.jpg'
import InputOption  from './InputOption';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import moment from 'moment'
 


const Post = ({name, message, photo, postImage, timestamp }) => {
    
    const classes = useStyles();
    const date = new Date(timestamp?.toDate()).toUTCString()
  
    
    return (
        <div className={classes.post}>
 
            <div className={classes.header}>
                <Avatar src={imagen} className={avatarStyle}/>
                <div className={classes.info}>
                    <h1 className='font-bold text-transform: uppercase'>{name}</h1>
                    <h4 className='text-gray-400'>Fullstack Developer</h4>
                </div>
                <p>{moment(date).fromNow()}</p>
            </div>
            <hr/>
            <div className={classes.body}>
                <p> {message} </p>
            </div>
            <hr/>
            { postImage !== '' ? (
            <>
            <div className={classes.body}>
                <img src={postImage} width='85%' height='85%' alt=''/>
            </div>
            <hr/>
            </>
            ) : null }
            <div className={classes.buttons}>
                <InputOption Icon={FavoriteBorderOutlinedIcon} title='Like' color='#E60026'/>
                <InputOption Icon={ChatBubbleOutlineOutlinedIcon} title='Comment' color='#ADD8E6'/>
                <InputOption Icon={ShareOutlinedIcon} title='Share'/>
            </div>
            <hr/>
 
        </div>
    )
}

export default Post
