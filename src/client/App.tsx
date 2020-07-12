import * as React from "react";
import { Grid } from "gridjs-react";

import { getGitHubJobs, searchJobs } from "./api/github";

import { Job } from "./types";

/**
 * Application.
 */
const App: React.SFC<{}> = () => {
  const [initialJobs, setInitialJobs] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect((): void => {
    const getJobs = async () => {
      const initialJobs = await getGitHubJobs();
      setInitialJobs(initialJobs);
      setJobs(initialJobs);
    };
    getJobs();
  }, []);

  const handleSearch = async () => {
    const filteredJobs = await searchJobs(search);
    setJobs(filteredJobs);
  };

  return (
    <div id="app">
      <h1>gh-jobs</h1>
      <p>Jobs: {jobs.length}</p>
      <p>Default City: Los Angeles</p>
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
