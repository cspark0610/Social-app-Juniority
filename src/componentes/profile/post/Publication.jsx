import React, { useEffect, useState } from "react";
import "./style.css";
import Post from "../../post/Post";
import { db } from "../../../firebase/firebase";
import { useSelector } from "react-redux";

export const Publication = ({ handleOpen, setUsers, setTitle, selectedUser }) => {
  const [posts, setPosts] = useState([]);
  const locationUrl = useSelector(state => state.locationUrl);

  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc')
      .where("userId", "==", selectedUser.id)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      console.log('PASEE')
  }, []);

  useEffect( async () => {
    setPosts([])
    await db.collection("posts").orderBy('timestamp','desc')
      .where("userId", "==", selectedUser.id)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      console.log(posts)
  }, [locationUrl]);

  return (
    <>
      {posts.length ? (
        posts.map(({ id, data: { userId, name, message, messageCode, messageVideo, likes, photo, postImage, timestamp } }) => {
          return (
            <div className='max-w-full shadow-xl my-3.5 ' style={{ background: "white", borderRadius: "10px" }} key={id}>
              <Post handleOpen={handleOpen} id={id} userId={userId} name={name} message={message} messageCode={messageCode} messageVideo={messageVideo} photo={photo} postImage={postImage} timestamp={timestamp} likes={likes} setUsers={setUsers} setTitle={setTitle} />
            </div>
          );
        })
      ) : (
        <p className='p_no_post'>{`${selectedUser.fullName} no a relizado ningun post`}</p>
      )}
    </>
  );
};
