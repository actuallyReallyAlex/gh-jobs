import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";

import {
  SearchInputOuterContainer,
  SearchInputInnerContainer,
  SearchInputForm,
  SearchInputLeft,
  SearchInputInput,
  SearchInputButtonContainer,
} from "./SearchInput-styled";

import { searchJobs } from "../../redux/thunks/application";

import { LocationOption, RootState } from "../../types";

interface SearchInputProps {
  handleSearch: (search: string, locationOptions: LocationOption[]) => void;
  locationOptions: LocationOption[];
  searchValue: string;
}

const SearchInput: React.SFC<SearchInputProps> = (props: SearchInputProps) => {
  const { handleSearch, locationOptions, searchValue } = props;
  const [search, setSearch] = React.useState(searchValue);

  return (
    <SearchInputOuterContainer>
      <SearchInputInnerContainer>
        <SearchInputForm
          id="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(search, locationOptions);
          }}
        >
          <SearchInputLeft>
            <i className="material-icons">work_outline</i>
          </SearchInputLeft>
          <SearchInputInput
            aria-label="Title, companies, expertise or benefits"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title, companies, expertise or benefits"
            type="text"
            value={search}
          />
          <SearchInputButtonContainer>
            <Button
              buttonStyle="primary"
              id="search-submit"
              label="Search"
              type="submit"
            />
          </SearchInputButtonContainer>
        </SearchInputForm>
      </SearchInputInnerContainer>
    </SearchInputOuterContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  searchValue: state.application.searchValue,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (search: string, locationOptions: LocationOption[]) =>
    dispatch(searchJobs(search, locationOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
