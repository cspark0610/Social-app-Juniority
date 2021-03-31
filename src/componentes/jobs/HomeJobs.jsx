import React from "react";
import { Grid } from '@material-ui/core'



import Navbar from "../navbar/Navbar";
import "./style.css";

import Search from "./search/Search";
import Filter from "./filter/Filter";
import FormJobs from "./offerjobs/FormJobs";
import OfferJobs from "./offerjobs/OfferJobs";
import MostViews from "./widget/MostViews";


const HomeJobs = () => {
    return (
        <div >
      <Navbar/>
      <Grid container display="flex" align="center" >
        <Grid item md={12}>
        <Search/>
        </Grid>
        </Grid>
        <div className="home__border">
      <Grid container display="flex" align="center" spacing={3}>
        <Grid item md={3}>
            <Filter/>
        </Grid>

        <Grid item md={6}>
        <FormJobs/>
        <OfferJobs/>
        </Grid>

        <Grid item md={3}>
          <MostViews/>
        </Grid>
      </Grid>
    </div>

    </div>
    )
}

export default HomeJobs
