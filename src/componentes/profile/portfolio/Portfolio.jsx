import React from "react";
import { Grid } from "@material-ui/core";
import "./styles.css";

import Proyect from "./Proyect";


export const Portfolio = () => {

  return (
    <div className="container1">
      <div className="portfolio1">
        <h1 className="portfolio_title1"><b>Portfolio</b></h1>
        <hr className="line__profile__widget1" />
                <Proyect />
                <Proyect />

                <Proyect />

       </div>
    </div>
  );
};
