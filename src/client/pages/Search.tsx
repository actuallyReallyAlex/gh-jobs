import * as React from "react";
import { connect } from "react-redux";

import { getGitHubJobs, searchJobs } from "../api/github";

import SearchInput from "../components/SearchInput";
import JobCard from "../components/JobCard";
import OptionsPanel from "../components/OptionsPanel";
import Copyright from "../components/Copyright";

import { Job, LocationOption, RootState } from "../types";

export interface SearchProps {
  currentJobs: Job[];
}

const Search: React.SFC<SearchProps> = (props: SearchProps) => {
  const { currentJobs } = props;

  const [locationSearch, setLocationSearch] = React.useState("");
  const [location1, setLocation1] = React.useState("");
  const [location2, setLocation2] = React.useState("");
  const [location3, setLocation3] = React.useState("");
  const [location4, setLocation4] = React.useState("");
  const [fullTime, setFullTime] = React.useState(false);

  const locationOptions: LocationOption[] = [
    { name: "location1", setter: setLocation1, value: location1 },
    { name: "location2", setter: setLocation2, value: location2 },
    { name: "location3", setter: setLocation3, value: location3 },
    { name: "location4", setter: setLocation4, value: location4 },
  ];

  const handleLocationSearch = async () => {
    // const filteredJobs = await searchJobs(
    //   locationSearch,
    //   locationOptions,
    //   "location",
    //   fullTime
    // );
    // setJobs(filteredJobs);
  };

  const handleCheckBox = (e) => {
    const { checked, name, value } = e.target;
    const setter = locationOptions.find(
      (location: LocationOption) => location.name === name
    ).setter;
    if (checked) {
      setter(value);
    } else {
      setter("");
    }
  };

  return (
    <>
      <SearchInput fullTime={fullTime} locationOptions={locationOptions} />
      <div className="search__container">
        <OptionsPanel
          handleCheckBox={handleCheckBox}
          handleLocationSearch={handleLocationSearch}
          locationSearch={locationSearch}
          setFullTime={setFullTime}
          setLocationSearch={setLocationSearch}
        />
        <div className="jobs__container">
          {currentJobs &&
            currentJobs.map((job: Job) => <JobCard job={job} key={job.id} />)}
        </div>
      </div>
      <Copyright />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentJobs: state.application.currentJobs,
});

export default connect(mapStateToProps)(Search);
