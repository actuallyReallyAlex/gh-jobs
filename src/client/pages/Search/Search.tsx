import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Copyright from "../../components/Copyright";
import JobCard from "../../components/JobCard";
import OptionsPanel from "../../components/OptionsPanel";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";

import {
  SearchContainer,
  SearchJobsContainer,
  SearchNoResults,
} from "./Search-styled";

import { Job, LocationOption, RootState } from "../../types";

export interface SearchProps {
  currentJobs: Job[];
  currentPage: number;
  redirectPath: string;
  totalPages: number;
}

const Search: React.SFC<SearchProps> = (props: SearchProps) => {
  const { currentJobs, currentPage, redirectPath, totalPages } = props;

  const jobsOnPage = currentJobs.slice(currentPage * 5 - 5, currentPage * 5);

  const [location1, setLocation1] = React.useState("");
  const [location2, setLocation2] = React.useState("");
  const [location3, setLocation3] = React.useState("");
  const [location4, setLocation4] = React.useState("");

  const locationOptions: LocationOption[] = [
    { name: "Chicago", setter: setLocation1, value: location1 },
    { name: "Los Angeles", setter: setLocation2, value: location2 },
    { name: "New York City", setter: setLocation3, value: location3 },
    { name: "San Francisco", setter: setLocation4, value: location4 },
  ];

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

  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <>
      <SearchInput locationOptions={locationOptions} />
      <SearchContainer>
        <OptionsPanel
          handleCheckBox={handleCheckBox}
          locationOptions={locationOptions}
        />
        <SearchJobsContainer>
          {jobsOnPage &&
            jobsOnPage.map((job: Job) => <JobCard job={job} key={job.id} />)}
          {jobsOnPage.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
          {jobsOnPage.length === 0 && (
            <SearchNoResults id="no-results">
              No results. Please modify your search and try again.
            </SearchNoResults>
          )}
        </SearchJobsContainer>
      </SearchContainer>
      <Copyright />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentJobs: state.application.currentJobs,
  currentPage: state.application.currentPage,
  redirectPath: state.application.redirectPath,
  totalPages: state.application.totalPages,
});

export default connect(mapStateToProps)(Search);
