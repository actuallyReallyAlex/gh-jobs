import * as React from "react";
import { Link } from "react-router-dom";

import { getGitHubJobs, searchJobs } from "../api/github";

import { Job, LocationOption } from "../types";
import SearchInput from "../components/SearchInput";

export interface SearchProps {}

const Search: React.SFC<SearchProps> = () => {
  const [initialJobs, setInitialJobs] = React.useState([]);
  const [allJobs, setAllJobs] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
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

  React.useEffect((): void => {
    const getJobs = async () => {
      const initialJobs = await getGitHubJobs();
      setInitialJobs(initialJobs);
      setJobs(initialJobs);
    };
    getJobs();
  }, []);

  const handleLocationSearch = async () => {
    const filteredJobs = await searchJobs(
      locationSearch,
      locationOptions,
      "location",
      fullTime
    );
    setJobs(filteredJobs);
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
      <SearchInput
        fullTime={fullTime}
        locationOptions={locationOptions}
        setJobs={setJobs}
      />
      <p>Jobs: {jobs.length}</p>
      <p>Default City: Los Angeles</p>
      <label htmlFor="full-time">Full Time</label>
      <input
        id="full-time"
        name="full-time"
        onChange={(e) => setFullTime(e.target.checked)}
        type="checkbox"
        value="full-time"
      />
      <label htmlFor="location-1">Chicago</label>
      <input
        id="location-1"
        name="location1"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="Chicago"
      />
      <label htmlFor="location-2">Los Angeles</label>
      <input
        id="location-2"
        name="location2"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="Los Angeles"
      />
      <label htmlFor="location-3">New York City</label>
      <input
        id="location-3"
        name="location3"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="New York City"
      />
      <label htmlFor="location-4">San Francisco</label>
      <input
        id="location-4"
        name="location4"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="San Francisco"
      />
      <label htmlFor="location-search">Location Search</label>
      <input
        id="location-search"
        onChange={(e) => setLocationSearch(e.target.value)}
        type="text"
        value={locationSearch}
      />
      <button onClick={() => handleLocationSearch()}>Search</button>
      {jobs &&
        jobs.map((job: Job) => (
          <Link key={job.id} to={`/${job.id}`}>
            {job.id}
          </Link>
        ))}
      {/* {jobs && (
        <Grid
          columns={[
            {
              name: "Actions",
              formatter: (cell, row) => {
                console.log(cell);
                return _(<Link to={`/${cell}`}>GO!</Link>);
              },
            },
            "Company",
            "Created At",
            "Location",
            "Title",
            "Type",
          ]}
          data={jobs.map((job: Job) => [
            job.id,
            job.company,
            job.created_at,
            job.location,
            job.title,
            job.type,
          ])}
        />
      )} */}
    </>
  );
};

export default Search;
