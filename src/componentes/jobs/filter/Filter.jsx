import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import JobType from "./JobType";
import Location from "./Location";
import { useSelector } from "react-redux";
import Availability from "./Availability";
import PayRate from "./PayRate";
import FilterSkills from "./FilterSkills";
import Position from "./Position";
import { Grid } from "@material-ui/core";

const Filter = ({ jobsOffers, setJobsOffers }) => {
  const filter = useSelector((state) => state.filter);

  const handleClickPosition = () => {
    const filtered = jobsOffers.filter(
      (job) =>
        job.position.toLowerCase().indexOf(filter.position[0].toLowerCase()) >
        -1
    );
    setJobsOffers(filtered);
  };

  const handleClickSkills = () => {
    const filtered = jobsOffers.filter(
      (job) =>
        job.skills.toLowerCase().indexOf(filter.position[0].toLowerCase()) > -1
    );
    setJobsOffers(filtered);
  };

  const handleClickAvailability = () => {
    const filtered = jobsOffers.filter(
      (job) =>
        job.availability
          .toLowerCase()
          .indexOf(filter.position[0].toLowerCase()) > -1
    );
    setJobsOffers(filtered);
  };

  const handleClickJobType = () => {
    const filtered = jobsOffers.filter(
      (job) =>
        job.position.toLowerCase().indexOf(filter.position[0].toLowerCase()) >
        -1
    );
    setJobsOffers(filtered);
  };

  const handleClickPayRate = () => {
    const filtered = jobsOffers.filter(
      (job) =>
        job.payRate.toLowerCase().indexOf(filter.position[0].toLowerCase()) > -1
    );
    setJobsOffers(filtered);
  };

  const handleClickLocation = () => {
    const filtered = jobsOffers.filter(
      (job) =>
        job.location.toLowerCase().indexOf(filter.position[0].toLowerCase()) >
        -1
    );
    setJobsOffers(filtered);
  };
  const clear = () => {
    window.location.reload();
  };

  return (
    <div className="aling__filter">
      <div className="back__filters">
        <Grid container>
          <Grid item md={6} className="text__aling__left text__aling">
            <h3 className="h3__filters">Filters</h3>
          </Grid>
          <Grid item md={6} className="text__aling__filter">
            <Button className="button__filter" onClick={clear}>
              Refresh
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="back">
        <h3 className="h3__skill">Position</h3>
        <Position />
        <Button className="button__jobs" onClick={handleClickPosition}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Skills</h3>
        <FilterSkills />
        <Button className="button__jobs" onClick={handleClickSkills}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Availability</h3>
        <Availability />
        <Button className="button__jobs" onClick={handleClickAvailability}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Job Type</h3>
        <JobType className="select__multiple" />
        <Button className="button__jobs" onClick={handleClickJobType}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Pay Rate / Hr ($)</h3>
        <PayRate />
        <Button className="button__jobs" onClick={handleClickPayRate}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Location</h3>
        <Location className="select__multiple" />
        <Button className="button__jobs" onClick={handleClickLocation}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Filter;
