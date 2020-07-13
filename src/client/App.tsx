import * as React from "react";
import { Grid } from "gridjs-react";

import {
  getGitHubJobs,
  locationSearchJobs,
  searchJobs,
  getAllGitHubJobs,
} from "./api/github";

import { Job } from "./types";
import { groupBy } from "./util";

/**
 * Application.
 */
const App: React.SFC<{}> = () => {
  const [initialJobs, setInitialJobs] = React.useState([]);
  const [allJobs, setAllJobs] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [locationSearch, setLocationSearch] = React.useState("");

  React.useEffect((): void => {
    const getJobs = async () => {
      const initialJobs = await getGitHubJobs();
      setInitialJobs(initialJobs);
      setJobs(initialJobs);
    };
    getJobs();
  }, []);

  React.useEffect((): void => {
    const getAllJobs = async () => {
      const allJobs = await getAllGitHubJobs();
      setAllJobs(allJobs);
      const grouped = groupBy(allJobs, "location");
      console.log(grouped);
    };
    getAllJobs();
  }, []);

  const handleSearch = async () => {
    const filteredJobs = await searchJobs(search);
    setJobs(filteredJobs);
  };

  const handleLocationSearch = async () => {
    const filteredJobs = await locationSearchJobs(locationSearch);
    setJobs(filteredJobs);
  };

  return (
    <div id="app">
      <h1>gh-jobs</h1>
      <p>Jobs: {jobs.length}</p>
      <p>Default City: Los Angeles</p>
      <label htmlFor="location-search">Location Search</label>
      <input
        id="location-search"
        onChange={(e) => setLocationSearch(e.target.value)}
        type="text"
        value={locationSearch}
      />
      <button onClick={() => handleLocationSearch()}>Search</button>

      <label htmlFor="search">Search</label>
      <input
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        value={search}
      />
      <button onClick={() => handleSearch()}>Search</button>
      {jobs && (
        <Grid
          columns={["Company", "Created At", "Location", "Title", "Type"]}
          data={jobs.map((job: Job) => [
            job.company,
            job.created_at,
            job.location,
            job.title,
            job.type,
          ])}
        />
      )}
    </div>
  );
};

export default App;
