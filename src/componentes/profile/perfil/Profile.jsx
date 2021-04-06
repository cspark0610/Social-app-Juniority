import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import {
  setFollowersSelectedUser,
  setSelectedUser,
} from "../../../store/selectedUser";
import { setCurrentUser } from "../../../store/currentUser";

export const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    const validator = user.followers.filter(
      (user) => user.id == currentUser.id
    );
    console.log(validator);
    validator.length ? setIsFollowing(true) : setIsFollowing(false);
  }, []);

  useEffect(() => {
    
  }, [isFollowing])

  const addFollow = async (targetUser) => {
    const thisUser = {...currentUser};
    const { fullName, avatar, id } = thisUser;

    targetUser.followers = [...targetUser.followers, { fullName, avatar, id }];
    thisUser.follow = [
      ...thisUser.follow,
      {
        fullName: targetUser.fullName,
        avatar: targetUser.avatar,
        id: targetUser.id,
      },
    ];

    await db.collection("user").doc(targetUser.id).set(targetUser);
    await db.collection("user").doc(currentUser.id).set(thisUser);

    setIsFollowing(true);
  };

  const unFollow = async (targetUser) => {
    const thisUser = { ...currentUser };

    targetUser.followers = targetUser.followers.filter(
      (user) => user.id !== thisUser.id
    );
    thisUser.follow = thisUser.follow.filter(
      (user) => user.id !== targetUser.id
    );

    console.log(targetUser, thisUser);

    await db.collection("user").doc(targetUser.id).set(targetUser);
    await db.collection("user").doc(currentUser.id).set(thisUser);

    setIsFollowing(false);
  };

  const followHandler = (e) => {
    e.preventDefault();
    if (isFollowing) {
      unFollow(user);
    } else {
      addFollow(user);
    }
  };

  return (
    <div className="back">
      <div className="userProfile__top">
        {/*               <img src="https://www.colorhexa.com/3cb4e5.png" alt="" /> */}
        <Avatar className="avatar__profile__post">
          <img src={user.avatar} alt="avatar" />
        </Avatar>
        <br />
        {/* <h3>John Doe</h3>
              <h4>Full Stack Developer</h4> */}
        { user.id === currentUser.id ? (
          <p>{currentUser.fullName.toUpperCase()}</p>
        ) : 
        !isFollowing ? (
          <Button
            onClick={(e) => followHandler(e)}
            className="button__profile__follow"
          >
            Follow
          </Button>
        ) : (
          <Button 
          className="button__profile__follow"
          onClick={e => followHandler(e)}>Unfollow</Button>
        )
        }
        {user.id === currentUser.id ? null : <Button className="button__profile__hire">Hire</Button>}
        <br />
        <hr className="line__profile" />
        <h3>Follow</h3>
        <h4>{user.follow.length}</h4>

        <hr className="line__profile" />
        <h3>Followers</h3>
        <h4>{user.followers.length}</h4>
        <hr className="line__profile" />
        <br />

        <div>
          <Link to="/" className="link__profile">
            www.johndoe.com
          </Link>
          <br />
          <Link to="/" className="link__profile">
            www.rf.com/johndoe
          </Link>
          <br />
          <Link to="/" className="link__profile">
            www.twitter.com/johndoe
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
};
