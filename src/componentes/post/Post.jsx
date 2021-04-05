import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase.js";
import firebase from "firebase";

import inputStyles from "./InputMessageStyle.js";
import { Avatar, Card } from "@material-ui/core";
import useStyles from "./PostStyle.js";
import InputOption from "./InputOption";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import moment from "moment";
import { useSelector } from "react-redux";

const Post = ({ id, name, message, userId, photo, postImage, timestamp }) => {
  const classes = useStyles();
  const inputClasses = inputStyles();
  const date = new Date(timestamp?.toDate()).toUTCString();
  const [comment, setComment] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const currentUser = useSelector((state) => state.currentUser);

  let handleComment = () => {
    db.collection("comments")
      .where("postId", "==", id)
      .get()
      .then((querySnapShot) => {
        setData(
          querySnapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      })
      .then(() => console.log(data))
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setComment(true);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    db.collection("comments")
      .add({
        postId: id,
        userId: currentUser.id,
        text: input,
        userName: currentUser.fullName,
        photo: currentUser.avatar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("exitoso"));
  };
  useEffect(() => {
    //https://firebase.google.com/docs/firestore/query-data/listen
    db.collection("comments")
      .where("postId", "==", id)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [comment]);

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
            <img src={postImage} width="85%" height="85%" alt="" />
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
        <span onClick={() => handleComment()}>
          <InputOption
            Icon={ChatBubbleOutlineOutlinedIcon}
            title="Comment"
            color="#ADD8E6"
          />
        </span>
        <InputOption Icon={ShareOutlinedIcon} title="Share" />
      </div>
      <hr />
      {comment && (
        <div
          className="max-w-full shadow-xl my-3.5 "
          style={{ background: "white", borderRadius: "10px" }}
        >
          <Card className={inputClasses.container}>
            <div className={inputClasses.container_input}>
              <Avatar src={currentUser.avatar} />
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", width: "100%" }}
              >
                <input
                  placeholder="Write a comment"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    border: "none",
                    flex: "1",
                    marginLeft: "10px",
                    outlineWidth: "0",
                    fontWeight: "600",
                    fontSize: "74%",
                  }}
                />
                <button type="submit">
                  <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
                </button>
              </form>
            </div>
          </Card>
          {data.length > 0 ? (
            <>
              {data.map((comment) => (
                <div key={comment.id}>
                  <Avatar src={comment.data.photo} />
                  {comment.data.userName}
                  <br />
                  {comment.data.text}
                </div>
              ))}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Post;
