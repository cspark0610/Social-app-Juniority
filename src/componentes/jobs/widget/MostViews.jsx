import React from "react";
import "./style.css";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const MostViews = () => {
  return (
      <>
    <div className="widgets__MostViews">
      <div className="widgets__header">
        <h2>Product Director</h2>
        <hr className="line__profile__widget" />
      </div>
    </div>
          <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__filter">Filters</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
      </div>
      </>
  );
};

export default MostViews;
