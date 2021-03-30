import React from "react";
import { Grid } from '@material-ui/core'
import { Profile } from "./perfil/Profile";
import { Portfolio } from "./portfolio/Portfolio"
import { PostProfile } from "./post/PostProfile";
import { Widget } from "./widget/Widget";
import { Banner } from "./banner/Banner";
import Navbar from "../navbar/Navbar";
import "./style.css"
import { Publication } from "./post/Publication";


const HomeProfile = () => {
  return (
    <div >
      <Navbar/>
      
      <Grid container display="flex" align="center">
        <Grid item md={12}>
        <Banner/>
        </Grid>
        </Grid>
        <div className="home__border">
      <Grid container display="flex" align="center" spacing={3}>
        <Grid item md={3}>
            <Profile/>
            <Portfolio/>
        </Grid>

        <Grid item md={6}>
          <PostProfile/>
          <Publication/>
        </Grid>

        <Grid item md={3}>
          <Widget/>
        </Grid>
      </Grid>
    </div>

    </div>
  );
};

export default HomeProfile;

