import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import {InputIcon} from "./InputIcon";
import "./style.css";


export const PostProfile = () => {
  return (
    <div className="feed__containerInput">
      <Grid container >
        <Grid item md={6} className="text__aling__left text__aling">
        <h3>John Doe</h3>
        <p>Full Stack Developer</p>
        <p>
          <LocationOnIcon />
          Buenos Aires, Argentina
        </p>
        <div className="post__buttom">
                <InputIcon Icon={ArtTrackIcon} title="Feed" color="#3cb4e5" />
                <InputIcon Icon={InfoOutlinedIcon} title="Info" color="#65BAAF" />
                <InputIcon Icon={WorkOutlineOutlinedIcon} title="Portfolio" color="#65BAAF" />
            </div>
        </Grid>
        <Grid item md={6} className="text__aling__right">
        <Button className="button__profile__follow">
        <MailOutlineIcon className="message__post"/> Message
        </Button>
        </Grid>
      </Grid>
    </div>
  );
};
