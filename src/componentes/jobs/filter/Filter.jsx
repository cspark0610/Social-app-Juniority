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

const Filter = ({ jobsOffers, setJobsOffers }) => {
  const filter = useSelector((state) => state.filter);

  const handleClickPosition = () => {
    const filteredPosition = jobsOffers.filter(
      (job) =>
        job.position.toLowerCase().indexOf(filter.position[0].toLowerCase()) >
        -1
    );
    setJobsOffers(filteredPosition);
  };

  const handleClickSkills = () => {
    const filteredSkills = jobsOffers.filter(
      (job) =>
        job.skills.toLowerCase().indexOf(filter.position[0].toLowerCase()) > -1
    );
    setJobsOffers(filteredSkills);
  };

  const handleClickAvailability = () => {
    const filteredAvailability = jobsOffers.filter(
      (job) =>
        job.availability
          .toLowerCase()
          .indexOf(filter.position[0].toLowerCase()) > -1
    );
    setJobsOffers(filteredAvailability);
  };

  const handleClickJobType = () => {
    const filteredJobType = jobsOffers.filter(
      (job) =>
        job.position.toLowerCase().indexOf(filter.position[0].toLowerCase()) >
        -1
    );
    setJobsOffers(filteredJobType);
  };

  const handleClickPayRate = () => {
    const filteredPayRate = jobsOffers.filter(
      (job) =>
        job.salary.toLowerCase().indexOf(filter.position[0].toLowerCase()) > -1
    );
    setJobsOffers(filteredPayRate);
  };

  const handleClickLocation = () => {
    const filteredLocation = jobsOffers.filter(
      (job) =>
        job.location.toLowerCase().indexOf(filter.position[0].toLowerCase()) >
        -1
    );
    setJobsOffers(filteredLocation);
  };

  return (
    <div className="aling__filter">

      <div className="back">
        <h3 className="h3__skill">Position</h3>
        <Position setJobsOffers={setJobsOffers} />
        <Button className="button__jobs" onClick={handleClickPosition}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Skills</h3>
        <FilterSkills setJobsOffers={setJobsOffers} jobsOffers={jobsOffers} />
        <Button className="button__jobs" onClick={handleClickSkills}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Availability</h3>
        <Availability setJobsOffers={setJobsOffers} jobsOffers={jobsOffers} />
        <Button className="button__jobs" onClick={handleClickAvailability}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Job Type</h3>
        <JobType
          className="select__multiple"
          setJobsOffers={setJobsOffers}
          jobsOffers={jobsOffers}
        />
        <Button className="button__jobs" onClick={handleClickJobType}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Pay Rate</h3>
        <PayRate setJobsOffers={setJobsOffers} jobsOffers={jobsOffers} />
        <Button className="button__jobs" onClick={handleClickPayRate}>
          Search
        </Button>
      </div>

      <div className="back">
        <h3 className="h3__skill">Location</h3>
        <Location
          className="select__multiple"
          setJobsOffers={setJobsOffers}
          jobsOffers={jobsOffers}
        />
        <Button className="button__jobs" onClick={handleClickLocation}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Filter;
