import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import Search from "./Search";
import Navbar from "../navbar/Navbar";
import FormCourses from "./FormCourses";
import OfferCourses from "./OfferCourses";
import Jobs from "../sidebarIzq/Jobs";

const Courses = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);
  const [coursesOffers, setCoursesOffers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  return (
    <>
      {!currentUser ? (
        history.push("/register")
      ) : (
        <>
          <Navbar />

          <div className='home__borderJob home__border'>
            <Grid container display='flex' align='center' spacing={3} justify='center'>
              <Grid item md={6}>
                <Search setCoursesOffers={setCoursesOffers} allCourses={allCourses} />
              </Grid>
            </Grid>

            <Grid container display='flex' align='center' spacing={3}>
              <Grid item md={3}>
                {/* <Filter /> */}
              </Grid>

              <Grid item md={6}>
                <FormCourses />
                <OfferCourses coursesOffers={coursesOffers} setCoursesOffers={setCoursesOffers} setAllCourses={setAllCourses} />
              </Grid>

              <Grid item md={3} className='padding'>
                <Jobs type={"jobs"} title={"Jobs"} />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default Courses;
