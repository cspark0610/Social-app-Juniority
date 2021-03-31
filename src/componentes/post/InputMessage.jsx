import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.js";
import firebase from "firebase";
import { Card } from "@material-ui/core";
import useStyles from "./InputMessageStyle.js";
import { inputStyle } from "./InputMessageStyle.js";
import { createIconStyle } from "./InputMessageStyle.js";
import { useAvatarStyles, useInputStyles } from "./InputMessageStyle.js";
import CreateIcon from "@material-ui/icons/Create";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import IconButton from "@material-ui/core/IconButton";
//import { makeStyles } from '@material-ui/core/styles';
import InputOption from "./InputOption";
import Post from "./Post";
import { Avatar } from "@material-ui/core";
import imagen from "../assets/ag.jpg";
import { useSelector } from "react-redux";

const InputMessage = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const classes = useStyles();
  const inputClasses = useInputStyles();
  const avatarClasses = useAvatarStyles();

  const handleSubmit = (e) => {
    //https://medium.com/firebase-developers/the-secrets-of-firestore-fieldvalue-servertimestamp-revealed-29dd7a38a82b
    e.preventDefault();
    db.collection("posts")
      .add({
        name: currentUser.fullName,
        description: "description",
        message: input,
        photo:
          "https://pbs.twimg.com/profile_images/1353676146844565505/QpmdpDvT_400x400.jpg",
        postImage: imageUrl ? imageUrl : "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setImageUrl(false))
      .catch((err) => console.log(err));

    setInput("");
  };
  useEffect(() => {
    //https://firebase.google.com/docs/firestore/query-data/listen
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const storageRef = firebase.storage().ref("POST-IMAGENES");
    if (file) {
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setImageUrl(await fileRef.getDownloadURL());
    }
  };

  return (
    <>
      <div
        className="max-w-full shadow-xl my-3.5 "
        style={{ background: "white", borderRadius: "10px" }}
      >
        <div className={classes.optionsIcons}>
          <InputOption
            Icon={ShareOutlinedIcon}
            title="Share Update"
            color="#ADD8E6"
          />

          <input
            onChange={(e) => onFileChange(e)}
            accept="image/*"
            id="icon-button-file"
            type="file"
            className={inputClasses.input}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              size="small"
              aria-label="upload picture"
              component="span"
            >
              <InputOption
                Icon={ImageOutlinedIcon}
                title="Upload a photo"
                color="#ADD8E6"
              />
            </IconButton>
          </label>

          <InputOption
            Icon={SaveOutlinedIcon}
            title="Write an article"
            color="#ADD8E6"
          />
        </div>
        <Card className={classes.container}>
          <div className={classes.container_input}>
            <Avatar className={avatarClasses.large} src={imagen} />

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", width: "100%" }}
            >
              <CreateIcon style={createIconStyle} />
              <input
                placeholder="Write your thoughts..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" onClick={handleSubmit}>
                <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
              </button>
            </form>
          </div>
        </Card>
      </div>

      {console.log(posts)}
      {posts.map(
        ({ id, data: { name, message, photo, postImage, timestamp } }) => (
          <div
            className="max-w-full shadow-xl my-3.5 "
            style={{ background: "white", borderRadius: "10px" }}
            key={id}
          >
            <Post
              key={id}
              name={name}
              message={message}
              photo={photo}
              postImage={postImage}
              timestamp={timestamp}
            />
          </div>
        )
      )}
    </>
  );
};

export default InputMessage;
