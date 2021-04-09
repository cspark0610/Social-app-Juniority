import React,{ useState, useEffect }  from "react";
import useStyles from "./jobsStyle";
import { Paper } from "@material-ui/core";
import CardJob from "./CardJob";
import { db } from "../../firebase/firebase"


export default function Jobs() {
  const classes = useStyles();

  const [jobsOffers, setJobsOffers] = useState([]);

  useEffect(()=>{
    db.collection('jobs').orderBy('timestamp', 'desc').limit(4)
    .onSnapshot(shot =>{
      setJobsOffers(shot.docs.map(doc =>({
            id: doc.id,
            data: doc.data(),
      })
      ))
    })
  },[]);

  return (
    <>
   
    <div className={classes.body}>
          <Paper className={classes.top}>
            <div className={classes.heading}>
              <h4>
                <b>Job offers</b>
              </h4>
            </div>
            <hr />
            
              {jobsOffers && jobsOffers.map(({id, data:{position, location, timestamp}}) =>(
                <CardJob id={id} position={position} location={location} timestamp={timestamp}/>
              ))}
           
          </Paper>
    </div>
    
  </>
  );
}
