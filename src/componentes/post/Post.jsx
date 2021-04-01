import React from "react";
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import useStyles from "./PostStyle.js";

import InputOption from "./InputOption";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import moment from "moment";

const Post = ({ name, message, userId, photo, postImage, timestamp }) => {
  const classes = useStyles();
  const date = new Date(timestamp?.toDate()).toUTCString();

  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <Avatar src={photo} />
        <div className={classes.info}>
      <Link to={`/profile/${userId}`}>
          <h1 className="font-bold text-transform: uppercase">{name}</h1>
          <h4 className="text-gray-400">Fullstack Developer</h4>
        </Link>
        </div>
        <p>{moment(date).fromNow()}</p>
      </div>
      <hr />
      <div className={classes.message}>
        <p> {message} </p>
      </div>
      <hr />
      {postImage !== "" ? (
        <>
          <div className={classes.body}>
            <img src={postImage} width="85%" height="85%" alt=''/>
          </div>
          <hr />
        </>
      ) : null}
      <div className={classes.buttons}>
        <InputOption
          Icon={FavoriteBorderOutlinedIcon}
          title="Like"
          color="#E60026"
        />
        <InputOption
          Icon={ChatBubbleOutlineOutlinedIcon}
          title="Comment"
          color="#ADD8E6"
        />
        <InputOption Icon={ShareOutlinedIcon} title="Share" />
      </div>
      <hr />
    </div>
  );
};

export default Post;
