import React, { useEffect, useState } from "react";
import moment from "moment";
import firebase from "firebase";
import { Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Chip, Card, Avatar, Typography } from "@material-ui/core";
import { emphasize, withStyles } from "@material-ui/core/styles";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import IconButton from "@material-ui/core/IconButton";
import { AccessTime, LocationOn, FavoriteBorder, ChatBubbleOutlineOutlined, ShareOutlined, Favorite, SendOutlined, Cached } from "@material-ui/icons";
import logo from "../../assets/juniority.svg";
import { InputIcon } from "../../profile/post/InputIcon";
import { useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import useStyles from "../../post/PostStyle";
import inputStyles from "../../post/InputMessageStyle";
import { useInputStyles } from "../../post/InputMessageStyle";
import InputOption from "../../post/InputOption";

const OfferJobsPost = ({ jobsOffer, handleClickOpen, open, handleClose, input, setInput, onFileChange, handleSubmit, handleOpen, setUsers, setTitle }) => {
  const inputClasses = inputStyles();
  const classes = useStyles();
  const inputClass = useInputStyles();
  const currentUser = useSelector((state) => state.currentUser);
  const [inUse, setInUse] = useState(Cached);
  const [openComment, setOpenComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [viewMore, setViewMore] = useState(true);
  const [data, setData] = useState([]);
  const [lastKey, setLastKey] = useState({});

  const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[100],
      height: theme.spacing(3),
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.grey[300],
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[300], 0.12),
      },
    },
  }))(Chip);

  const handleLike = (e) => {
    if (!e.target.matches(".zse")) {
      if (inUse === FavoriteBorder) {
        const batch = db.batch();
        const jobReference = db.collection("jobs").doc(jobsOffer.id);
        const likeReference = db.collection("jobsLikes").doc(`${jobsOffer.id}_${currentUser.id}`);
        batch.update(jobReference, {
          likes: firebase.firestore.FieldValue.increment(1),
        });
        batch.set(likeReference, {
          jobId: jobsOffer.id,
          userId: currentUser.id,
          userName: currentUser.fullName,
          photo: currentUser.avatar || "",
        });
        setInUse(Favorite);
        batch.commit();
      } else {
        const otherBatch = db.batch();
        const jobReference = db.collection("jobs").doc(jobsOffer.id);
        const likeReference = db.collection("jobsLikes").doc(`${jobsOffer.id}_${currentUser.id}`);

        otherBatch.update(jobReference, {
          likes: firebase.firestore.FieldValue.increment(-1),
        });
        otherBatch.delete(likeReference);
        setInUse(FavoriteBorder);
        otherBatch.commit();
      }
    }
  };
  let openLikes = () => {
    db.collection("jobsLikes")
      .where("jobId", "==", jobsOffer.id)
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

  const handleComment = () => {
    db.collection("jobsComments")
      .orderBy("timestamp", "desc")
      .where("postId", "==", jobsOffer.id)
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
    setOpenComment(true);
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setCommentInput("");
    db.collection("jobsComments")
      .add({
        postId: jobsOffer.id,
        userId: currentUser.id,
        text: commentInput,
        userName: currentUser.fullName,
        photo: currentUser.avatar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("exitoso"));
  };

  let seeMore = () => {
    if (lastKey) {
      db.collection("jobsComments")
        .orderBy("timestamp", "desc")
        .where("postId", "==", jobsOffer.id)
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
    db.collection("jobsLikes")
      .doc(`${jobsOffer.id}_${currentUser.id}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setInUse(Favorite);
        } else {
          setInUse(FavoriteBorder);
        }
      });
  }, []);

  return (
    <>
      {jobsOffer && (
        <div className='job__container' style={{ backgroundColor: "white" }} key={jobsOffer.id}>
          <Grid container>
            <Grid item md={2}>
              <img src={logo} className='logo' alt='Logo Juniority' width='60%' height='60%' />
            </Grid>
            <Grid item md={6} className='text__job__left text__job'>
              <h2>{jobsOffer.position}</h2>
              <p>Juniority</p>
              <p><LocationOn className='date__icon'/>{jobsOffer.location}</p>
            </Grid>
            <Grid item md={4} className='text__job__right'>
              <p><AccessTime className='date__icon' />{moment(new Date(jobsOffer.timestamp?.toDate().toUTCString())).fromNow()}</p>
            </Grid>
          </Grid>
          <hr className='line__profile__widget' />
          <div className='salary_availability'>
            <p> {jobsOffer.salary} </p>
            <p> {jobsOffer.availability}</p>
          </div>
          <div className='description'>
            <p>{jobsOffer.description}</p>
          </div>
          <div className='skills'>
            <Breadcrumbs aria-label='breadcrumb'>{jobsOffer.skills.split(" ") && jobsOffer.skills.split(" ").map((skill) => <StyledBreadcrumb label={skill} />)}</Breadcrumbs>
          </div>
          <hr className='line__profile__widget' />
          <div className='job__buttom' style={{ display: "flex" }}>
            <span onClick={handleLike}>
              <InputIcon Icon={inUse} color='red'
                title={
                  <div onClick={openLikes} className={`${classes.likes} zse`}>
                    {jobsOffer.likes || 0}
                  </div>
                }/>
            </span>
            <span onClick={handleComment}>
              <InputIcon Icon={ChatBubbleOutlineOutlined} color='black' />
            </span>
            <InputIcon Icon={ShareOutlined} title='2' color='black' />
            <Button size='large' variant='contained' color='primary' className='button__apply' onClick={handleClickOpen} style={{ marginLeft: "auto" }}>
              Apply
            </Button>
          </div>
          <hr className='line__profile__widget' />

          {openComment && (
            <div className='max-w-full shadow-xl my-3.5 ' style={{ background: "white", borderRadius: "10px" }}>
              <Card className={inputClasses.container}>
                <div className={inputClasses.container_input}>
                  <Avatar src={currentUser.avatar} />
                  <form onSubmit={handleCommentSubmit} style={{ display: "flex", width: "100%" }}>
                    <input placeholder='Write a comment'type='text' value={commentInput} onChange={(e) => setCommentInput(e.target.value)}
                      style={{ border: "none",flex: "1",marginLeft: "10px",outlineWidth: "0",fontWeight: "600", fontSize: "74%"}}/>
                    <button type='submit'>
                      <SendOutlined style={{ color: "#ADD8E6" }} />
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
          <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
              <DialogTitle id='form-dialog-title'>Apply</DialogTitle>
              <DialogContent>
                <DialogContentText>To apply to this job, please enter your email address here and load your CV.</DialogContentText>
                <TextField autoFocus margin='dense' id='name' label='Email Address' type='email' fullWidth value={input} onChange={(e) => setInput(e.target.value)} />
              </DialogContent>
              <DialogActions className={classes.optionsIcons}>
                <Button onClick={handleClose} color='primary'>Cancel</Button>
                <input onChange={(e) => onFileChange(e)} accept='file/*' id='icon-button-file' type='file' className={inputClass.input}/>
                <label htmlFor='icon-button-file'>
                  <IconButton color='primary' size='small' aria-label='upload picture' component='span' style={{marginRight:'90px',marginBottom:'20px'}}>
                    <InputOption Icon={AttachFileIcon} title='Upload your CV' color='#ADD8E6'/>
                  </IconButton>
                  <Button onClick={handleSubmit} color='primary' type='submit'>Load your CV</Button>
                
                </label>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferJobsPost;
