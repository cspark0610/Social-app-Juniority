import React from "react";
import { Grid } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {InputIcon} from "./InputIcon";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Button from "@material-ui/core/Button";
import "./style.css";

export const Publication = () => {
  return (
<div className="post__publication">
      <Grid container>
        <Grid item md={12} className="text__aling__left text__aling">
          <h3>
            <Avatar />
            John Doe
          </h3>
          <p>Full Stack Developer</p>
          <hr className="line__profile__widget" />

          {/* <div className="post__buttom">
                <InputIcon Icon={ArtTrackIcon} title="Feed" color="#3cb4e5" />
                <InputIcon Icon={InfoOutlinedIcon} title="Info" color="#65BAAF" />
                <InputIcon Icon={WorkOutlineOutlinedIcon} title="Portfolio" color="#65BAAF" />
            </div> */}
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <hr className="line__profile__widget" />
          <div className="post__buttom">
                <InputIcon Icon={FavoriteBorderIcon} title="16" color="red" />
                <InputIcon Icon={ChatBubbleOutlineOutlinedIcon} title="8" color="black" />
                <InputIcon Icon={ShareOutlinedIcon} title="2" color="black" />
            </div>
            <hr className="line__profile__widget" />
            <Button className="button__comments">
        Awesome!
        </Button>
        <Button className="button__comments__dos">
        What is it about?
        </Button>
        <Button className="button__comments__dos">
        Ooooh, Great, wow
        </Button>
        </Grid>
      </Grid>
    </div>
  );
};
