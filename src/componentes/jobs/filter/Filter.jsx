import React from "react";
import "./style.css";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DiscreteSlider from "./DiscreteSlider";
import { Checkbox } from "pretty-checkbox-react";
import DemoSelectMultiple from "./DemoSelectMultiple";



const Filter = () => {


  return (
    <div className="aling__filter">
      <div className="back">
        <Grid container>
          <Grid item md={6}>
            <h3 className="h3__filter">Filters</h3>
          </Grid>

          <Grid item md={6}>
            <Button className="button__jobs">Clear All</Button>
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
        <DemoSelectMultiple className="select__multiple" />
        {/* <form>
          <TextField
            name="Search skills.."
            variant="outlined"
            label="Search skills"
            placeholder="Search skills"
            className="TextField__filter"
          />
        </form> */}
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
        <Grid container>
          <Grid item md={6}>
            <Checkbox />
            <br />
            <Checkbox />
            <br />
            <Checkbox />
          </Grid>

          <Grid item md={6} className="text__h4">
            <p> Hourly</p>
            <br />
            <p> Full Time</p>
            <br />
            <p> Part Time</p>
          </Grid>
        </Grid>
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
        <DemoSelectMultiple className="select__multiple" />
        {/* <form>
          <TextField
            name="Select a job Type"
            variant="outlined"
            label="Select a job Type"
            placeholder="Select a job Type"
            className="TextField__filter"
          />
        </form> */}
        <inpu />
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
        <DiscreteSlider />
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
        <DemoSelectMultiple className="select__multiple" />
        {/* <form>
          <TextField
            name="Select a experience Level"
            variant="outlined"
            label="Select a experience Level"
            placeholder="Select a experience Level"
            className="TextField__filter"
          />
        </form> */}
        <inpu />
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
        <DemoSelectMultiple className="select__multiple" />
        {/* <form>
          <TextField
            name="Select a location"
            variant="outlined"
            label="Select a location"
            placeholder="Select a location"
            className="TextField__filter"
            color="green"
          />
        </form> */}
        <inpu />
      </div>
    </div>
  );
};

export default Filter;
