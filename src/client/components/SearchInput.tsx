import * as React from "react";
import { connect } from "react-redux";

import { searchJobs } from "../redux/thunks";

import { LocationOption } from "../types";

interface SearchInputProps {
  handleSearch: (search: string, locationOptions: LocationOption[]) => void;
  locationOptions: LocationOption[];
}

const SearchInput: React.SFC<SearchInputProps> = (props: SearchInputProps) => {
  const { handleSearch, locationOptions } = props;
  const [search, setSearch] = React.useState("");

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
          <button
            className="search__button"
            onClick={() => handleSearch(search, locationOptions)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (search: string, locationOptions: LocationOption[]) =>
    dispatch(searchJobs(search, locationOptions)),
});

export default connect(null, mapDispatchToProps)(SearchInput);
