import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.js";
import firebase from "firebase";
import { Card } from "@material-ui/core";
import useStyles from "./InputMessageStyle.js";
import { inputStyle } from "./InputMessageStyle.js";
import { createIconStyle, createIconStyle2 } from "./InputMessageStyle.js";
import { useAvatarStyles, useInputStyles } from "./InputMessageStyle.js";
import CreateIcon from "@material-ui/icons/Create";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
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
  const [inputCode, setInputCode] = useState("");
  const [inputVideo, setInputVideo] = useState("");
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [show, setShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const keynavbar = useSelector((state) => state.keynavbar);
  const [userLikes, setUserLikes] = useState([]);
  const [title, setTitle] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  
  //para el modal de CODE!!
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  
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
        messageCode: inputCode,
        messageVideo:inputVideo,
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
    setInputCode("");
    setInputVideo("");
    handleClose();
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
        const filtered = docs.filter((doc) => doc.description.toLowerCase().indexOf(keynavbar.toLowerCase()) > -1 || doc.message.toLowerCase().indexOf(keynavbar.toLowerCase()) > -1 || doc.name.toLowerCase().indexOf(keynavbar.toLowerCase()) > -1);
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
      <div className='max-w-full shadow-xl my-3.5 ' style={{ background: "white", borderRadius: "10px" }}>
        <div className={classes.optionsIcons}>
          {/* icono mostrar Video */}
          <IconButton color='primary' size='small' aria-label='upload picture' component='span'onClick={()=>setShowVideo(!showVideo)}>
            <InputOption Icon={VideoLibraryOutlinedIcon} title='Share Video' color='#ADD8E6' />
          </IconButton>  
          {/* icono de subir imagen */}
          <input onChange={(e) => onFileChange(e)} accept='image/*' id='icon-button-file' type='file' className={inputClasses.input} />
          <label htmlFor='icon-button-file'>
            <IconButton color='primary' size='small' aria-label='upload picture' component='span'>
              <InputOption Icon={ImageOutlinedIcon} title='Upload a photo' color='#ADD8E6' />
            </IconButton>
          </label>
          {/* icono code */}
            <IconButton color='primary' size='small' aria-label='upload picture' component='span' onClick={()=>setShow(!show)}>
              <InputOption Icon={SaveOutlinedIcon} title='Write a code' color='#ADD8E6' />
            </IconButton>
        </div>
            <Card className={classes.container}>
              <div className={classes.container_input}>
                <Avatar className={avatarClasses.large} src={currentUser.avatar} />
                <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
                  <CreateIcon style={createIconStyle} />
                  <input placeholder='Write your thoughts...' type='text' value={input} onChange={(e) => setInput(e.target.value)} style={inputStyle} />
                  <button disabled={input ? false : true} type='submit' onClick={handleSubmit}>
                    <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
                  </button>
                </form>
              </div>
            </Card>

            <Card className={ show ? classes.container : classes.noShow }>
              <div className={classes.container_input}>
                <Avatar className={avatarClasses.large} src={currentUser.avatar} />
                <form onSubmit={handleSubmit} style={{ display: "flex", width: "90%" }}>
                  <CreateIcon style={createIconStyle2} />
                  <textarea rows="5" cols="50" placeholder='Write your Code...' style={inputStyle} value={inputCode} type='text' onChange={(e) =>setInputCode(e.target.value)}/>
                  <button disabled={inputCode ? false : true} type='submit' onClick={handleSubmit}>
                    <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
                  </button>
                </form>
              </div>
            </Card>

            <Card className={ showVideo ? classes.container : classes.noShow }>
              <div className={classes.container_input}>
                <Avatar className={avatarClasses.large} src={currentUser.avatar} />
                <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
                  <CreateIcon style={createIconStyle} />
                  <input placeholder='Share your video url...' style={inputStyle} value={inputVideo} type='text' onChange={(e) =>setInputVideo(e.target.value)}/>
                  <button disabled={inputVideo ? false : true} type='submit' onClick={handleSubmit}>
                    <SendOutlinedIcon style={{ color: "#ADD8E6" }} />
                  </button>
                </form>
              </div>
            </Card>
      </div>
      <CarroselJobs />
      <TransitionsModal open={open} handleClose={handleClose} users={userLikes} title={title} /> 
      {posts.map(({ id, likes, name, message, messageCode, messageVideo ,userId, photo, postImage, timestamp }) => (
        <div className='max-w-full shadow-xl my-3.5 ' style={{ background: "white", borderRadius: "10px" }} key={id}>
          <Post handleOpen={handleOpen} id={id} name={name} message={message} messageCode={messageCode} messageVideo={messageVideo} userId={userId} photo={photo} postImage={postImage} timestamp={timestamp} likes={likes} setUsers={setUserLikes} setTitle={setTitle} />
        </div>
      ))}
    </>
  );
};

export default InputMessage;
