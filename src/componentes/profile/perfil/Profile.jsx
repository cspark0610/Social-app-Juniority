import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./style.css";
import { useSelector } from "react-redux";
import { addFollow, unFollow } from "../../utils/followSystem";
import { db } from "../../../firebase/firebase";

export const Profile = ({ user, setUsers, handleOpen, setTitle }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const [localUser, setLocalUser] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [actualUser, setActualUser] = useState();

  useEffect(() => {
    const validator = user.followers.filter((user) => user.id === currentUser.id);
    validator.length ? setIsFollowing(true) : setIsFollowing(false);
  }, []);

  useEffect(() => {}, [isFollowing]);

  const followHandler = (e) => {
    e.preventDefault();
    if (isFollowing) {
      unFollow(localUser, actualUser, setIsFollowing);
    } else {
      addFollow(localUser, actualUser, setIsFollowing);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await db
        .collection("user")
        .where("id", "==", user.id)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            setLocalUser(doc.data());
          });
        });
      await db
        .collection("user")
        .where("id", "==", currentUser.id)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            setActualUser(doc.data());
          });
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (localUser) {
      setFollowing(localUser.follow);
      setFollowers(localUser.followers);
    }
  }, [localUser]);

  const openFollowModal = (e, users, modalTitle) => {
    e.preventDefault();
    setTitle(modalTitle);
    const follows = [];
    users.map((user) =>
      follows.push({
        photo: user.avatar,
        userName: user.fullName,
        userId: user.id,
      })
    );
    setUsers(follows);
    handleOpen();
  };

  return (
    <div className='back'>
      <div className='userProfile__top'>
        {/* <img src="https://www.colorhexa.com/3cb4e5.png" alt="" /> */}
        <div className='avatar__circle'>
          <Avatar className='avatar__profile__post'>
            <img src={user.avatar} alt='avatar' />
          </Avatar>
        </div>
        <br />

        {user.id === currentUser.id ? (
          <p>{currentUser.fullName}</p>
        ) : !isFollowing ? (
          <Button onClick={(e) => followHandler(e)} className='button__profile__follow'>
            Follow
          </Button>
        ) : (
          <Button className='button__profile__follow' onClick={(e) => followHandler(e)}>
            Unfollow
          </Button>
        )}
        {user.id === currentUser.id ? null : <Button className='button__profile__hire'>Hire</Button>}
        <br />
        <hr className='line__profile' />
        <button onClick={(e) => openFollowModal(e, following, "Following")}>
          <h3>Following</h3>
        </button>
        <h4>{following.length}</h4>

        <hr className='line__profile' />
        <button onClick={(e) => openFollowModal(e, followers, "Followers")}>
          <h3>Followers</h3>
        </button>
        <h4>{followers.length}</h4>
        <hr className='line__profile' />
        <br />

        <div>
          <a href={user.portfolio} target='_blank' rel='noreferrer' className='link__profile'>
            {user.portfolio}
          </a>
        </div>
      </div>
    </div>
  );
};
