import React, { useState, useEffect } from "react";
import useStyles from "./graphViewsStyle";
import { Paper } from "@material-ui/core";
import Graph from "./Graph";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { db } from "../../firebase/firebase.js";
import Moment from 'moment';
import { extendMoment } from 'moment-range';


const GraphViews = () => {
    const classes = useStyles();
    const moment = extendMoment(Moment);
    const [posts, setPosts] = useState([]); //aca 
    
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

    return (
      <>
        {posts[0] ? (
        
        <div className={classes.body}>
          <Paper className={classes.top}>
          <div className={classes.heading}>
              <h4><b>Posts evolution</b></h4>
          </div>
          <hr />
          <div className={classes.sectionGraph}>
              <div><b>Total Posts</b><BarChartIcon fontSize="large" className={classes.iconGraph} />
                  <div className={classes.numberGraph}><b>{posts ? posts.length:"0"}</b> Total Posts</div>
              </div>
              <div><b>Range Dates</b><AssessmentIcon fontSize="large" className={classes.iconGraph} />
                 
                  <div className={classes.numberGraph}>
                      <b>{`From ${ String(moment(new Date(posts[posts.length-1].timestamp?.toDate()).toUTCString())._i).slice(4,16) } `}</b>
                      
                      <b>{`Until ${ String(moment(new Date(posts[0].timestamp?.toDate()).toUTCString())._i).slice(4,16) } `}</b>
                  </div>
                  
              </div>
          </div>
          <hr />
          <div>
              <Graph />
          </div>
        </Paper>
        
        </div>
      ) :null}
    </>
    );
  };
  export default GraphViews


