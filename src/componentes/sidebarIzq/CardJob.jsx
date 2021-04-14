import React from "react";
import { useStyles } from "./cardJobStyle";
import { Paper } from "@material-ui/core";
import logoJob from "../assets/juniority.svg";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import RestoreIcon from "@material-ui/icons/Restore";
import moment from "moment";

const CardJob = ({ id, position, location, timestamp, type }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.body} key={id}>
        <Paper className={classes.top}>
          <div className={classes.section1}>
            <div>
              <b className={classes.tituloJob}>{position ? position : ""}</b>
              <p className={classes.subtituloJob}>Juniority</p>
              <p className={classes.subtituloJob1}>
                {type === "jobs" ? <PersonPinCircleIcon /> : null}
                {location ? location : ""}
              </p>
            </div>
            <img
              src={logoJob}
              alt="logo juniority"
              className={classes.logojob}
            />
          </div>
          <hr className={classes.divider} />
          <div className={classes.section1}>
            {type === "jobs" ? (
              <div>
                <p className={classes.subtituloConection}>
                  <b>18 connections</b>{" "}
                </p>
              </div>
            ) : null}
            <div className={classes.conection}>
              <img
                src="https://cflvdg.avoz.es/default/2017/11/20/00121511209023018696270/Foto/dpa_20171103_172213720.jpg"
                alt="logo juniority"
                className={classes.logoConection}
              />
              <img
                src="https://cflvdg.avoz.es/default/2017/11/20/00121511209023018696270/Foto/dpa_20171103_172213720.jpg"
                alt="logo juniority"
                className={classes.logoConection}
              />
              <img
                src="https://cflvdg.avoz.es/default/2017/11/20/00121511209023018696270/Foto/dpa_20171103_172213720.jpg"
                alt="logo juniority"
                className={classes.logoConection}
              />
              <img
                src="https://cflvdg.avoz.es/default/2017/11/20/00121511209023018696270/Foto/dpa_20171103_172213720.jpg"
                alt="logo juniority"
                className={classes.logoConection}
                w
              />
            </div>
          </div>
          <hr className={classes.divider1} />
          <div className={classes.section1}>
            <p className={classes.subtituloJob1}>
              <RestoreIcon />
              {moment(new Date(timestamp?.toDate().toUTCString())).fromNow()}
            </p>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default CardJob;
