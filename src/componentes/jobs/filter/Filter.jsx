import React from "react";
import "./style.css";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DiscreteSlider from "./DiscreteSlider";
/* import { Radio, Checkbox } from "pretty-checkbox-react"; */


const Filter = () => {

  return (
    <>
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

      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__skill">Skills</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
        <form>
          <TextField
            name="Search skills.."
            variant="outlined"
            label="Search skills"
            placeholder="Search skills"
            className="TextField__filter"
          />
        </form>
      </div>

      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__skill">Availability</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
        <div className="text__h4">
        <h4>Hourly</h4>
        <h4>Full Time</h4>
        <h4>Part Time</h4>
        </div>
      </div>


      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__skill">Job Type</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
        <form>
          <TextField
            name="Select a job Type"
            variant="outlined"
            label="Select a job Type"
            placeholder="Select a job Type"
            className="TextField__filter"
          />
        </form>
        <inpu/>
      </div>


      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__skill">Pay Rate / Hr ($)</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
<DiscreteSlider/>
      </div>


      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__skill">Experience Level</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
        <form>
          <TextField
            name="Select a experience Level"
            variant="outlined"
            label="Select a experience Level"
            placeholder="Select a experience Level"
            className="TextField__filter"
          />
        </form>
        <inpu/>
      </div>


      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__skill">Location</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear</Button>
          </Grid>
        </Grid>
        <form>
          <TextField
            name="Select a location"
            variant="outlined"
            label="Select a location"
            placeholder="Select a location"
            className="TextField__filter"
          />
        </form>
        <inpu/>
      </div>
    </>
  );
};

export default Filter;
