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

import InputOption from "./InputOption";
import Post from "./Post";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import CarroselJobs from "../carrouselJobs/CarroselJobs";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransitionsModal from "../home/TransitionModal.jsx";

const InputMessage = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [open, setOpen] = React.useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [title, setTitle] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const keynavbar = useSelector((state) => state.keynavbar);

  const classes = useStyles();
  const inputClasses = useInputStyles();
  const avatarClasses = useAvatarStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("posts")
      .add({
        name: currentUser.fullName,
        description: "description",
        message: input,
        userId: currentUser.id,
        photo: currentUser.avatar,
        postImage: imageUrl ? imageUrl : "",
        likes: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setImageUrl(false);
        toast.success("Post created successfully", { autoClose: 2000 });
        setIsUploaded(false);
      })
      .catch((err) => console.error(err));

    setInput("");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPosts(docs);
      });
  }, []);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        const filtered = docs.filter(
          (doc) =>
            doc.description.toLowerCase().indexOf(keynavbar.toLowerCase()) >
              -1 ||
            doc.message.toLowerCase().indexOf(keynavbar.toLowerCase()) > -1 ||
            doc.name.toLowerCase().indexOf(keynavbar.toLowerCase()) > -1
        );
        setPosts(filtered);
      });
  }, [keynavbar]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref("POST-IMAGENES");
    if (file) {
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setImageUrl(await fileRef.getDownloadURL());
      setIsUploaded(true);
    }
  };

  return (
    <>
      <ToastContainer />
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
            <Avatar className={avatarClasses.large} src={currentUser.avatar} />

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
              <button
                disabled={input ? false : true}
                type="submit"
                onClick={handleSubmit}
              >
                <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
              </button>
            </form>
          </div>
        </Card>
      </div>
      <TransitionsModal
        open={open}
        handleClose={handleClose}
        users={userLikes}
        title={title}
      />
      <CarroselJobs />
      {posts.map(
        ({ id, likes, name, message, userId, photo, postImage, timestamp }) => (
          <div
            className="max-w-full shadow-xl my-3.5 "
            style={{ background: "white", borderRadius: "10px" }}
            key={id}
          >
            <Post
              handleOpen={handleOpen}
              id={id}
              name={name}
              message={message}
              userId={userId}
              photo={photo}
              postImage={postImage}
              timestamp={timestamp}
              likes={likes}
              setUsers={setUserLikes}
              setTitle={setTitle}
            />
          </div>
        )
      )}
    </>
  );
};

export default InputMessage;
