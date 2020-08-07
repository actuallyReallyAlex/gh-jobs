import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Checkbox from "../Checkbox";
import Input from "../Input";

import { OptionsPanelContainer } from "./OptionsPanel-styled";

import {
  setFullTime,
  setLocationSearch,
} from "../../redux/actions/application";
import { searchJobs } from "../../redux/thunks";

import { LocationOption, RootState } from "../../types";

export interface OptionsPanelProps {
  fullTime: boolean;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (search: string, locationOptions: LocationOption[]) => void;
  handleSetFullTime: (fullTime: boolean) => void;
  handleSetLocationSearch: (locationSearch: string) => void;
  locationOptions: LocationOption[];
  locationSearch: string;
}

const OptionsPanel: React.SFC<OptionsPanelProps> = (
  props: OptionsPanelProps
) => {
  const {
    fullTime,
    handleCheckBox,
    handleSearch,
    handleSetFullTime,
    handleSetLocationSearch,
    locationOptions,
    locationSearch,
  } = props;

  return (
    <OptionsPanelContainer>
      <Checkbox
        checked={fullTime}
        label="Full Time"
        name="full-time-checkbox"
        onChange={(e) => handleSetFullTime(e.target.checked)}
        value="full-time"
      />

      <Input
        icon="public"
        id="location-search"
        label="Location"
        onChange={(e) => handleSetLocationSearch(e.target.value)}
        placeholder="City, state, zip code or country"
        value={locationSearch}
      />

      {locationOptions.map((location: LocationOption, i: number) => (
        <Checkbox
          checked={location.value !== ""}
          key={i}
          id={`location-${i + 1}`}
          label={location.name}
          name={location.name}
          onChange={(e) => handleCheckBox(e)}
          value={location.name}
        />
      ))}

      <Button
        buttonStyle="primary"
        label="Search"
        onClick={() => handleSearch("", locationOptions)}
        type="button"
      />
    </OptionsPanelContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  fullTime: state.application.fullTime,
  locationSearch: state.application.locationSearch,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (search: string, locationOptions: LocationOption[]) =>
    dispatch(searchJobs(search, locationOptions)),
  handleSetFullTime: (fullTime: boolean) => dispatch(setFullTime(fullTime)),
  handleSetLocationSearch: (locationSearch: string) =>
    dispatch(setLocationSearch(locationSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
