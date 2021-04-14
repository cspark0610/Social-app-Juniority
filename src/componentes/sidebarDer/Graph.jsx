import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import useStyles from "./graphViewsStyle";
import { db } from "../../firebase/firebase.js";
import Moment from 'moment';
import { extendMoment } from 'moment-range';


const Graph = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const moment = extendMoment(Moment);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPosts(docs);
      });
  }, []);

  const dates = [];
  for(let i=0; i < posts.length; i++){
    if(posts){
      dates.push(moment(new Date(posts[i].timestamp?.toDate()).toUTCString()));
    }else{
      return null;
    }
  }
  
  
  let monCount=0;let tueCount=0;let wedCount=0;let thuCount=0;let friCount=0;let satCount=0;let sunCount=0;
  for(let j=0; j<dates.length ;j++){
    if(String(dates[j]._i).slice(0,3).trim().toLowerCase()==='mon'){
      monCount=monCount+1;
    }else if(String(dates[j]._i).slice(0,3).trim().toLowerCase()==='tue'){
      tueCount=tueCount+1;
    }else if(String(dates[j]._i).slice(0,3).trim().toLowerCase()==='wed'){
      wedCount=wedCount+1;
    }else if(String(dates[j]._i).slice(0,3).trim().toLowerCase()==='thu'){
      thuCount=thuCount+1;
    }else if(String(dates[j]._i).slice(0,3).trim().toLowerCase()==='fri'){
      friCount=friCount+1;
    }else if(String(dates[j]._i).slice(0,3).trim().toLowerCase()==='sat'){
      satCount=satCount+1;
    }else{
      sunCount=sunCount+1;
    } 
  }

  let promPosts =Math.floor((monCount+tueCount+wedCount+thuCount+friCount+satCount+sunCount) / 7);
  

  return (
    <div>
      <div className={classes.chartbody}>
        <Chart  width='90%'height='100%'chartType='AreaChart'loader={<div>Loading Chart</div>}
          data={[
            [" ", " ", "  "],
            [" ", promPosts, monCount],
            [" ", promPosts, tueCount],
            [" ", promPosts, wedCount],
            [" ", promPosts, thuCount],
            [" ", promPosts, friCount],
            [" ", promPosts, satCount],
            [" ", promPosts, sunCount],
          ]}
          options={{
            title: "Number of Posts by day Chart",

            // For the legend to fit, we make the chart area smaller
            chartArea: { width: "85%", height: "70%" },
            lineWidth: 5,
            colors: ["#3CB4E5", "#162D27"],
            areaOpacity: 0.3,
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
