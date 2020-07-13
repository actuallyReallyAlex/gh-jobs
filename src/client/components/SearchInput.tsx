import * as React from "react";

import { searchJobs } from "../api/github";

const SearchInput: React.SFC<{}> = () => {
  const [search, setSearch] = React.useState("");

  // const handleSearch = async () => {
  //   const filteredJobs = await searchJobs(
  //     search,
  //     locationOptions,
  //     "description",
  //     fullTime
  //   );
  //   setJobs(filteredJobs);
  // };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        value={search}
      />
      <button onClick={() => {}}>Search</button>
    </div>
  );
};

export default SearchInput;
