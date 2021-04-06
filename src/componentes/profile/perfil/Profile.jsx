import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { setFollowersSelectedUser, setSelectedUser } from "../../../store/selectedUser";
import { setCurrentUser } from "../../../store/currentUser";

export const Profile = ({user}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    const validator = user.followers.filter(user => user.id == currentUser.id);
    console.log(validator)
    validator.length ? setIsFollowing(true) : setIsFollowing(false);
  }, []);

  const addFollow = async (targetUser) => {
    const thisUser = currentUser;
    const { fullName, avatar, id } = thisUser;

    /* targetUserCopy.followers.push({ fullName, avatar, id}); */
    targetUser.followers = [...targetUser.followers, { fullName, avatar, id }];
    thisUser.follow = [...thisUser.follow, {
      fullName: targetUser.fullName,
      avatar: targetUser.avatar,
      id: targetUser.id
    }]
    /* thisUser.follow.push({ 
      fullName: targetUser.fullName,
      avatar: targetUser.avatar,
      id: targetUser.id
    }); */
    
    console.log(targetUser, thisUser)
    await db.collection('user').doc(targetUser.id).set(targetUser);
    await db.collection('user').doc(currentUser.id).set(thisUser);
    
    /* dispatch(setFollowersSelectedUser({ fullName, avatar, id })); */
    /* dispatch(setCurrentUser({
      fullName: targetUser.fullName,
      avatar: targetUser.avatar,
      id: targetUser.id
    })); */
  };

  const unFollow = (e) => {

  };

  const followHandler = (e, string) => {
    e.preventDefault();
    isFollowing ? unFollow() : addFollow(user);
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
        { !isFollowing ? (
        <Button onClick={e => followHandler(e)} className="button__profile__follow">Follow</Button>
         ) : (
          <Button>Unfollow</Button>
        )}
        <Button className="button__profile__hire">Hire</Button>
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
