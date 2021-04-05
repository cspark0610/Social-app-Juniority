import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardJob from "../sidebarIzq/CardJob";

import { useStyles } from "./carrouselJobsStyle";

const CarroselJobs = () => {
  const classes = useStyles();

  var settings = {
    infinite: true,
    speed: 500,
      autoplay: true,
    autoplaySpeed: 2500,   };
  return (
    <div className={classes.body}>
      <Slider {...settings}>
        <div className={classes.backgr}>
          <div className={classes.image}>
            <CardJob />
            <CardJob />
            <CardJob />

          </div>
        </div>
        <div className={classes.backgr}>
          <div className={classes.image}>
            <CardJob />
            <CardJob />
          </div>
        </div>{" "}
        <div className={classes.backgr}>
             <CardJob />
           </div>
         <div className={classes.backgr}>
          <div className={classes.image}>
            <CardJob />
            <CardJob />
          </div>
        </div>{" "}
      </Slider>
    </div>
  );
};

export default CarroselJobs;
