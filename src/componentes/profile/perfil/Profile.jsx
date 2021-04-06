import React from "react";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = ({ user }) => {
  return (
    <div className="back">
      <div className="userProfile__top">
        {/*               <img src="https://www.colorhexa.com/3cb4e5.png" alt="" /> */}
        <div className="avatar__circle">
        <Avatar className="avatar__profile__post">
          <img src={user.avatar} alt="avatar" />
        </Avatar>
        </div>
        <br />
        {/* <h3>John Doe</h3>
              <h4>Full Stack Developer</h4> */}
        <Button className="button__profile__follow">+Follow</Button>
        <Button className="button__profile__hire">Hire</Button>
        <br />
        <hr className="line__profile" />
        <h3>Follow</h3>
        <h4>355</h4>

        <hr className="line__profile" />
        <h3>Followers</h3>
        <h4>255</h4>
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
