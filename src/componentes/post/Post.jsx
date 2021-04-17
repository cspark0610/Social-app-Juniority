import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase.js";
import firebase from "firebase";

import inputStyles from "./InputMessageStyle.js";
import { Avatar, Card, Typography } from "@material-ui/core";
import useStyles from "./PostStyle.js";
import InputOption from "./InputOption";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import moment from "moment";
import { useSelector } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import ReactPlayer from "react-player";
import CreateIcon from "@material-ui/icons/Create";
//import { useAvatarStyles, useInputStyles } from "./InputMessageStyle.js";

const Post = ({ id, name, message, messageCode, messageVideo, userId, photo, postImage, likes, timestamp, handleOpen, setUsers, setTitle }) => {
  const classes = useStyles();
  
  const inputClasses = inputStyles();
  const date = new Date(timestamp?.toDate()).toUTCString();
  const currentUser = useSelector((state) => state.currentUser);
  const [comment, setComment] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inUse, setInUse] = useState(FavoriteBorderOutlinedIcon);
  const [lastKey, setLastKey] = useState("En un comienzo");
  const [viewMore, setViewMore] = useState(true);
  const [show, setShow] = useState(false);

  const createIconStyle2 = {
    marginLeft: "10px",
    position: "relative",
    top: "1.5%",
  };
  const inputStyle = {
    border: "none",
    flex: "1",
    marginLeft: "10px",
    outlineWidth: "0",
    fontWeight: "600",
  };

  const handleComment = () => {
    db.collection("comments")
      .orderBy("timestamp", "desc")
      .where("postId", "==", id)
      .limit(4)
      .onSnapshot((querySnapShot) => {
        setLastKey(querySnapShot.docs[querySnapShot.docs.length - 1]);
        setData(
          querySnapShot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
    setComment(true);
  };
  const handleCommentCode =() => {
    setShow(!show);
    handleComment();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    setInputCode("");
    db.collection("comments")
      .add({
        postId: id,
        userId: currentUser.id,
        text: input,
        textCode: inputCode,
        userName: currentUser.fullName,
        photo: currentUser.avatar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("exitoso"));
  };

  let handleLikes = (e) => {
    if (!e.target.matches(".zse")) {
      if (inUse === FavoriteBorderOutlinedIcon) {
        const batch = db.batch();
        const postReference = db.collection("posts").doc(id);
        const likeReference = db.collection("likes").doc(`${id}_${currentUser.id}`);

        batch.update(postReference, {
          likes: firebase.firestore.FieldValue.increment(1),
        });
        batch.set(likeReference, {
          postId: id,
          userId: currentUser.id,
          userName: currentUser.fullName,
          photo: currentUser.avatar || "",
        });
        setInUse(FavoriteOutlinedIcon);
        batch.commit();
      } else {
        const otherBatch = db.batch();
        const postReference = db.collection("posts").doc(id);
        const likeReference = db.collection("likes").doc(`${id}_${currentUser.id}`);

        otherBatch.update(postReference, {
          likes: firebase.firestore.FieldValue.increment(-1),
        });
        otherBatch.delete(likeReference);
        setInUse(FavoriteBorderOutlinedIcon);
        otherBatch.commit();
      }
    }
  };
  let openLikes = () => {
    db.collection("likes")
      .where("postId", "==", id)
      .get()
      .then((querySnapShot) => {
        setUsers(
          querySnapShot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
    setTitle("Likes");
    handleOpen();
  };

  let seeMore = () => {
    if (lastKey) {
      db.collection("comments")
        .orderBy("timestamp", "desc")
        .where("postId", "==", id)
        .startAfter(lastKey)
        .limit(4)
        .get()
        .then((querySnapShot) => {
          setLastKey(querySnapShot.docs[querySnapShot.docs.length - 1]);
          setData((prev) => {
            let newData = querySnapShot.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            });
            return [...prev, ...newData];
          });
        });
    } else {
      setViewMore(false);
    }
  };

  useEffect(() => {
    db.collection("likes")
      .doc(`${id}_${currentUser.id}`)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setInUse(FavoriteOutlinedIcon);
        }
      });
  }, []);

  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <Avatar src={photo} />
        <div className={classes.info}>
          <Link to={`/profile/${userId}`}>
            <h1 className='font-bold text-transform: uppercase'>{name}</h1>
            <h4 className='text-gray-400'>Fullstack Developer</h4>
          </Link>
        </div>
        <p>{moment(date).fromNow()}</p>
      </div>
      <hr />
      <div className={classes.message}>
        <p> {message} </p>
      </div>
      <hr />
      {messageCode ? (
        <div className={classes.message}>
          <SyntaxHighlighter language='javascript' style={docco} showLineNumbers={true} wrapLines={true}>
            {messageCode}
          </SyntaxHighlighter>
        </div>
      ) : null}
      <hr />
      {messageVideo ? (
        <div className={classes.body}>
          <ReactPlayer url={messageVideo} controls={true} width='90%' style={{ height: "auto !important" }} />
        </div>
      ) : null}

      <hr />
      {postImage !== "" ? (
        <>
          <div className={classes.body}>
            <img src={postImage} width='85%' height='85%' alt='' />
          </div>
          <hr />
        </>
      ) : null}
      <div className={classes.buttons}>
        <span onClick={(e) => handleLikes(e)}>
          <InputOption Icon={inUse} color='#E60026'
            title={
              <div>
                Likes
                <span onClick={openLikes} className={`${classes.likes} zse`}>{likes || 0}</span>
              </div>
            }
          />
        </span>
        <span onClick={handleComment}>
          <InputOption Icon={ChatBubbleOutlineOutlinedIcon} title='Comment' color='#ADD8E6' />
        </span>
        <span onClick={handleCommentCode}>
          <InputOption Icon={SaveOutlinedIcon} title='Respond with code' color='#ADD8E6' />
        </span>
        <InputOption Icon={ShareOutlinedIcon} title='Share' />
      </div>
      <hr />
      {comment && (
        <div className='max-w-full shadow-xl my-3.5 ' style={{ background: "white", borderRadius: "10px" }}>
          <Card className={inputClasses.container}>
            <div className={inputClasses.container_input}>
              <Avatar src={currentUser.avatar} />
              <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
                <input placeholder='Write a comment' type='text' value={input} onChange={(e) => setInput(e.target.value)} style={{ border: "none", flex: "1", marginLeft: "10px", outlineWidth: "0", fontWeight: "600", fontSize: "74%" }} />
                <button type='submit'>
                  <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
                </button>
              </form>
            </div>
          </Card>

        {/*card para hacer un comment de codigo*/}
        <Card className={show ? classes.container : classes.noShow}>
          <div className={classes.container_input}>
         
            <form onSubmit={handleSubmit} style={{ display: "flex", width: "90%" }}>
              <CreateIcon style={createIconStyle2} />
              <textarea rows='4' cols='50' placeholder='Write your Code...' style={inputStyle} value={inputCode} type='text' onChange={(e) => setInputCode(e.target.value)} />
              <button disabled={inputCode ? false : true} type='submit' onClick={handleSubmit}>
                <SendOutlinedIcon style={{ color: "#ADD8E6",position:'relative',bottom:'15%'}} />
              </button>
            </form>
          </div>
        </Card>

          {data.length > 0 ? (
            <>
              {data.map((comment) => (
                <div className={classes.containerComment} key={comment.id}>
                  <Avatar src={comment.data.photo} />
                  <div className={classes.containerCommentText}>
                    <a href={`/profile/${comment.data.userId}`} className={classes.titleComment}>
                      {comment.data.userName}
                    </a>
                    <br />
                    {comment.data.text}
                    <br/>
                    {comment.data.textCode? (
                      <div className={classes.message}>
                      <SyntaxHighlighter language='javascript' style={docco} showLineNumbers={true} wrapLines={true}>
                        {comment.data.textCode}
                      </SyntaxHighlighter>
                    </div>
                    ):null}
                  </div>
                </div>
              ))}
              {viewMore && (
                <Typography color='primary' variant='caption' className={classes.likes} onClick={seeMore}>
                  ver mas ...
                </Typography>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Post;
