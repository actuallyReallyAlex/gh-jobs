import * as React from "react";
import { connect } from "react-redux";

import Copyright from "../components/Copyright";
import JobCard from "../components/JobCard";
import Notification from "../components/Notification";
import OptionsPanel from "../components/OptionsPanel";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";

import { Job, LocationOption, NotificationType, RootState } from "../types";

export interface SearchProps {
  currentJobs: Job[];
  currentPage: number;
  notificationMessage: string;
  notificationType: NotificationType;
}

const Search: React.SFC<SearchProps> = (props: SearchProps) => {
  const {
    currentJobs,
    currentPage,
    notificationMessage,
    notificationType,
  } = props;

  const jobsOnPage = currentJobs.slice(currentPage * 5 - 5, currentPage * 5);

  const [location1, setLocation1] = React.useState("");
  const [location2, setLocation2] = React.useState("");
  const [location3, setLocation3] = React.useState("");
  const [location4, setLocation4] = React.useState("");

  const locationOptions: LocationOption[] = [
    { name: "location1", setter: setLocation1, value: location1 },
    { name: "location2", setter: setLocation2, value: location2 },
    { name: "location3", setter: setLocation3, value: location3 },
    { name: "location4", setter: setLocation4, value: location4 },
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

  return (
    <>
      <SearchInput locationOptions={locationOptions} />
      <div className="search__container">
        <OptionsPanel handleCheckBox={handleCheckBox} />
        <div className="jobs__container">
          {notificationMessage && (
            <Notification
              message={notificationMessage}
              type={notificationType}
            />
          )}
          {jobsOnPage &&
            jobsOnPage.map((job: Job) => <JobCard job={job} key={job.id} />)}
          {jobsOnPage.length > 0 && <Pagination />}
          {jobsOnPage.length === 0 && (
            <p className="text__center" id="no-results">
              No results. Please modify your search and try again.
            </p>
          )}
        </div>
      </div>
      <Copyright />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentJobs: state.application.currentJobs,
  currentPage: state.application.currentPage,
  notificationMessage: state.application.notificationMessage,
  notificationType: state.application.notificationType,
});

export default connect(mapStateToProps)(Search);
