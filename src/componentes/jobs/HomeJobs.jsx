import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Navbar from "../navbar/Navbar";
import "./style.css";
import Search from "./search/Search";
import Filter from "./filter/Filter";
import FormJobs from "./offerjobs/FormJobs";
import OfferJobs from "./offerjobs/OfferJobs";
import MostViews from "./widget/MostViews";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const HomeJobs = () => {
  const [jobsOffers, setJobsOffers] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
 
  return (
    <>
      {!currentUser ? (
        history.push("/register")
      ) : (
        <>
          <Navbar/>

          <div className="home__borderJob home__border">
            <Grid container display="flex" align="center" spacing={3}>
              <Grid item md={12}>
                <Search />
              </Grid>
            </Grid>

            <Grid container display="flex" align="center" spacing={3}>
              <Grid item md={3}>
                <Filter jobsOffers={jobsOffers} setJobsOffers={setJobsOffers}/>
              </Grid>

              <Grid item md={6}>
                <FormJobs />
                <OfferJobs jobsOffers={jobsOffers} setJobsOffers={setJobsOffers}/>
              </Grid>

              <Grid item md={3} className="padding">
                <MostViews />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default HomeJobs;
