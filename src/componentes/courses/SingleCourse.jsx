import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Breadcrumbs, Grid, Chip, Card, Avatar, Typography } from "@material-ui/core";
import { emphasize, withStyles } from "@material-ui/core/styles";

import { FavoriteBorder, ChatBubbleOutlineOutlined, ShareOutlined, Favorite, SendOutlined } from "@material-ui/icons";
import logo from "../assets/juniority.svg";
import { InputIcon } from "../profile/post/InputIcon";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import useStyles from "../post/PostStyle";
import inputStyles from "../post/InputMessageStyle";
import TransitionsModal from "../home/TransitionModal";

const OfferJobsPost = ({ courseOffer }) => {
  const inputClasses = inputStyles();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);
  const [inUse, setInUse] = useState(FavoriteBorder);
  const [users, setUsers] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [viewMore, setViewMore] = useState(true);
  const [data, setData] = useState([]);
  const [lastKey, setLastKey] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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
        const courseReference = db.collection("courses").doc(courseOffer.id);
        const likeReference = db.collection("coursesLikes").doc(`${courseOffer.id}_${currentUser.id}`);

        batch.update(courseReference, {
          likes: firebase.firestore.FieldValue.increment(1),
        });
        batch.set(likeReference, {
          courseId: courseOffer.id,
          userId: currentUser.id,
          userName: currentUser.fullName,
          photo: currentUser.avatar || "",
        });
        setInUse(Favorite);
        batch.commit();
      } else {
        const otherBatch = db.batch();
        const courseReference = db.collection("courses").doc(courseOffer.id);
        const likeReference = db.collection("coursesLikes").doc(`${courseOffer.id}_${currentUser.id}`);

        otherBatch.update(courseReference, {
          likes: firebase.firestore.FieldValue.increment(-1),
        });
        otherBatch.delete(likeReference);
        setInUse(FavoriteBorder);
        otherBatch.commit();
      }
    }
  };

  let openLikes = () => {
    db.collection("coursesLikes")
      .where("courseId", "==", courseOffer.id)
      .get()
      .then((querySnapShot) => {
        setUsers(
          querySnapShot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
    handleOpen();
  };

  const handleOpenComment = () => {
    db.collection("coursesComments")
      .orderBy("timestamp", "desc")
      .where("courseId", "==", courseOffer.id)
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
  const handleSubmitComment = (e) => {
    e.preventDefault();
    setCommentInput("");
    db.collection("coursesComments")
      .add({
        courseId: courseOffer.id,
        userId: currentUser.id,
        text: commentInput,
        userName: currentUser.fullName,
        photo: currentUser.avatar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("exitoso"));
  };

  const seeMore = () => {
    if (lastKey) {
      db.collection("coursesComments")
        .orderBy("timestamp", "desc")
        .where("courseId", "==", courseOffer.id)
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
    db.collection("coursesLikes")
      .doc(`${courseOffer.id}_${currentUser.id}`)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setInUse(Favorite);
        }
      });
  }, []);

  return (
    <>
      {courseOffer && (
        <div className='job__container' style={{ backgroundColor: "white" }} key={courseOffer.id}>
          <Grid container>
            <Grid item md={2}>
              <a href={`${courseOffer.link}`} target='_blank' rel='noreferrer'>
                <img src={logo} className='logo' alt='Logo Juniority' width='60%' height='60%' />
              </a>
            </Grid>
            <Grid item md={6} className='text__job__left text__job'>
              <a href={`${courseOffer.link}`} target='_blank' rel='noreferrer'>
                <h2>{courseOffer.name}</h2>
              </a>
              <p>Juniority</p>
            </Grid>
          </Grid>
          <hr className='line__profile__widget' />
          <div className='salary_availability'>
            <p> {courseOffer.hours} </p>
          </div>
          <div className='description'>
            <p>{courseOffer.description}</p>
          </div>
          <div className='skills'>
            <Breadcrumbs aria-label='breadcrumb'>{courseOffer.technologies.split(" ") && courseOffer.technologies.split(" ").map((skill) => <StyledBreadcrumb label={skill} />)}</Breadcrumbs>
          </div>
          <hr className='line__profile__widget' />
          <div className='job__buttom' style={{ display: "flex" }}>
            <span onClick={handleLike}>
              <InputIcon
                Icon={inUse}
                color='red'
                title={
                  <div onClick={openLikes} className={`${classes.likes} zse`}>
                    {courseOffer.likes || 0}
                  </div>
                }
              />
            </span>
            <span onClick={handleOpenComment}>
              <InputIcon Icon={ChatBubbleOutlineOutlined} color='black' />
            </span>
            <InputIcon Icon={ShareOutlined} title='2' color='black' />
          </div>
          <hr className='line__profile__widget' />

          {openComment && (
            <div className='max-w-full shadow-xl my-3.5 ' style={{ background: "white", borderRadius: "10px" }}>
              <Card className={inputClasses.container}>
                <div className={inputClasses.container_input}>
                  <Avatar src={currentUser.avatar} />
                  <form style={{ display: "flex", width: "100%" }} onSubmit={handleSubmitComment}>
                    <input
                      placeholder='Write a comment'
                      type='text'
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      style={{
                        border: "none",
                        flex: "1",
                        marginLeft: "10px",
                        outlineWidth: "0",
                        fontWeight: "600",
                        fontSize: "74%",
                      }}
                    />
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
        </div>
      )}
      <TransitionsModal open={open} handleClose={handleClose} users={users} title='likes' />
    </>
  );
};

export default OfferJobsPost;
