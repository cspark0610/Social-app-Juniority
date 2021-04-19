import React from "react";
import "./portafolioStyle.css";
import { Grid } from "@material-ui/core";
import Proyect from "../profile/portfolio/Proyect";
import Navbar from "../navbar/Navbar";

const PortafolioGeneral = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="body">
          <div className="container">
            <div className="portfolio">
              <h1 className="portfolio_title">Portfolio</h1>
              <hr className="line__profile__widget" />
              <Grid container className="card-proyect">
                <Grid item md={3}>
                  <Proyect />
                </Grid>
                <Grid item md={3}>
                  <Proyect />
                </Grid>
                <Grid item md={3}>
                  <Proyect />
                </Grid>
                <Grid item md={3}>
                  <Proyect />
                </Grid>
                <Grid item md={3}>
                  <Proyect />
                </Grid>
                <Grid item md={3}>
                  <Proyect />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortafolioGeneral;
