import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { InputIcon } from "./InputIcon";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Button from "@material-ui/core/Button";
import "./style.css";
import { useSelector } from "react-redux";
import Post from "../../post/Post";
import {db} from '../../../firebase/firebase'

export const Publication = ({handleOpen, setUsers, setTitle, selectedUser }) => {
  const selectedUserPosts = useSelector((state) => state.selectedUserPosts);
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection("posts")
      // .orderBy("timestamp", "desc")
      .where('userId', '==', selectedUser.id)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [selectedUser.id]);

  return (
    <>
      {posts.length ? (
        posts.map(({
          id,
          data: { likes, name, message, userId, photo, postImage, timestamp },
        }) => {
          return (
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
              setUsers={setUsers}
              setTitle={setTitle}
            />
          </div>
            // <div className="post__publication">
            //   <Grid container>
            //     <Grid item md={12} className="text__aling__left text__aling">
            //       <h3>
            //         <Avatar>
            //           <img src={user.avatar} alt="avatar" />
            //         </Avatar>
            //         {user.fullName}
            //       </h3>
            //       <p>Full Stack Developer</p>
            //       <hr className="line__profile__widget" />

            //       {/* <div className="post__buttom">
            //     <InputIcon Icon={ArtTrackIcon} title="Feed" color="#3cb4e5" />
            //     <InputIcon Icon={InfoOutlinedIcon} title="Info" color="#65BAAF" />
            //     <InputIcon Icon={WorkOutlineOutlinedIcon} title="Portfolio" color="#65BAAF" />
            //     </div> */}
            //       <p>{post.message}</p>
            //       {post.postImage !== "" ? (
            //         <>
            //           <hr className="line__profile__widget" />
            //           <div>
            //             <img src={post.postImage} width="85%" height="85%" />
            //           </div>
            //         </>
            //       ) : null}
            //       <hr className="line__profile__widget" />
            //       <div className="post__buttom">
            //         <InputIcon
            //           Icon={FavoriteBorderIcon}
            //           title="16"
            //           color="red"
            //         />
            //         <InputIcon
            //           Icon={ChatBubbleOutlineOutlinedIcon}
            //           title="8"
            //           color="black"
            //         />
            //         <InputIcon
            //           Icon={ShareOutlinedIcon}
            //           title="2"
            //           color="black"
            //         />
            //       </div>
            //       <hr className="line__profile__widget" />
            //       <Button className="button__comments">Awesome!</Button>
            //       <Button className="button__comments__dos">
            //         What is it about?
            //       </Button>
            //       <Button className="button__comments__dos">
            //         Ooooh, Great, wow
            //       </Button>
            //     </Grid>
            //   </Grid>
            // </div>
          );
        })
      ) : (
        <p>{`${selectedUser.fullName} no a relizado ningun post`}</p>
      )}
    </>
  );
};
