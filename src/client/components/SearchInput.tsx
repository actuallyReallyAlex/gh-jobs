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
    <div className="search__container__outer">
      <div className="search__container__inner">
        <div className="input__addon__left">
          <i className="material-icons grey icon-sm">work_outline</i>
        </div>
        <input
          aria-label="Title, companies, expertise or benefits"
          className="search__input"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Title, companies, expertise or benefits"
          type="text"
          value={search}
        />
        <div className="search__button__container">
          <button className="search__button" onClick={() => {}}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
