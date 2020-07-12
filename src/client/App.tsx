import * as React from "react";
import { getGitHubJobs } from "./api/github";

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
    </div>
  );
};

export default App;
