import * as React from "react";
import { Grid } from "gridjs-react";

import { getGitHubJobs } from "./api/github";

import { Job } from "./types";

/**
 * Application.
 */
const App: React.SFC<{}> = () => {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect((): void => {
    const getJobs = async () => {
      const initialJobs = await getGitHubJobs();
      setJobs(initialJobs);
    };
    getJobs();
  }, []);

  return (
    <div id="app">
      <h1>gh-jobs</h1>
      <p>Jobs: {jobs.length}</p>
      <p>Default City: Los Angeles</p>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" />
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
