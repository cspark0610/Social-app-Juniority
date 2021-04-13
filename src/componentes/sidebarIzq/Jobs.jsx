import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStyles from "./jobsStyle";
import { Paper } from "@material-ui/core";
import CardJob from "./CardJob";
import { db } from "../../firebase/firebase";

export default function Jobs({ type, title }) {
  const classes = useStyles();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (type === "jobs") {
      db.collection("jobs")
        .orderBy("timestamp", "desc")
        .limit(4)
        .onSnapshot((shot) => {
          setOffers(
            shot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      db.collection("courses")
        .orderBy("timestamp", "desc")
        .limit(4)
        .onSnapshot((shot) => {
          setOffers(
            shot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, []);

  return (
    <>
      <div className={classes.body}>
        <Paper className={classes.top}>
          <div className={classes.heading}>
            <h4>
              <Link to={type === "jobs" ? "/jobs" : "/courses"}>
                <b>{title}</b>
              </Link>
            </h4>
          </div>
          <hr />

          {offers &&
            offers.map(
              ({
                id,
                data: { position, location, timestamp, name, hours },
              }) => (
                <CardJob
                  key={id}
                  position={position || name}
                  location={location || hours}
                  timestamp={timestamp}
                  type={type}
                />
              )
            )}
        </Paper>
      </div>
    </>
  );
}
