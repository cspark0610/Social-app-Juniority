import React,{ useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardJob from "../sidebarIzq/CardJob";
import { db } from "../../firebase/firebase"
import { useStyles } from "./carrouselJobsStyle";

const CarroselJobs = () => {
  const classes = useStyles();

  var settings = {
    infinite: true,
    speed: 2500,
    autoplay: true,
    autoplaySpeed: 2500,   
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  const [jobsOffers, setJobsOffers] = useState([]);

  useEffect(()=>{
    db.collection('jobs').orderBy('timestamp', 'desc').limit(6)
    .onSnapshot(shot =>{
      setJobsOffers(shot.docs.map(doc =>({
            id: doc.id,
            data: doc.data(),
      })
      ))
    })
  },[]);
  return (
    <div className={classes.body}>      
      {jobsOffers.length  ? 
          <Slider {...settings}>
          <div className={classes.backgr}>
            <div className={classes.image}>
              <CardJob position={jobsOffers[0]['data'].position } location={jobsOffers[0]['data'].location} timestamp={jobsOffers[0]['data'].timestamp}/>
              <CardJob position={jobsOffers[1]['data'].position } location={jobsOffers[1]['data'].location} timestamp={jobsOffers[1]['data'].timestamp} />
            </div>
          </div> 
          <div className={classes.backgr}>
            <div className={classes.image}>
              <CardJob position={jobsOffers[2]['data'].position } location={jobsOffers[2]['data'].location} timestamp={jobsOffers[2]['data'].timestamp}/>
              <CardJob position={jobsOffers[3]['data'].position } location={jobsOffers[3]['data'].location} timestamp={jobsOffers[3]['data'].timestamp}/>
            </div>
          </div> 
          <div className={classes.backgr}>
            <div className={classes.image}>
              <CardJob position={jobsOffers[4]['data'].position } location={jobsOffers[4]['data'].location} timestamp={jobsOffers[4]['data'].timestamp}/>
              <CardJob position={jobsOffers[5]['data'].position } location={jobsOffers[5]['data'].location} timestamp={jobsOffers[5]['data'].timestamp}/>      
            </div>
          </div> 
        </Slider>
      :null}
    </div>
  );
};

export default CarroselJobs;
