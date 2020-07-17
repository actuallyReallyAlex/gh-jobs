import * as React from "react";
import { connect } from "react-redux";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { setFullTime, setLocationSearch } from "../redux/actions/application";
import { RootState } from "../types";

export interface OptionsPanelProps {
  fullTime: boolean;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetFullTime: (fullTime: boolean) => void;
  handleSetLocationSearch: (locationSearch: string) => void;
  locationSearch: string;
}

const OptionsPanel: React.SFC<OptionsPanelProps> = (
  props: OptionsPanelProps
) => {
  const {
    fullTime,
    handleCheckBox,
    handleSetFullTime,
    handleSetLocationSearch,
    locationSearch,
  } = props;

  const locations = [
    "Chicago",
    "Los Angeles",
    "New York City",
    "San Francisco",
  ];
  return (
    <div className="options-panel__container">
      <Checkbox
        checked={fullTime}
        label="Full Time"
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

      {locations.map((location: string, i: number) => (
        <Checkbox
          key={i}
          id={`location-${i + 1}`}
          label={location}
          name={`location${i + 1}`}
          onChange={(e) => handleCheckBox(e)}
          value={location}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  fullTime: state.application.fullTime,
  locationSearch: state.application.locationSearch,
});

const mapDispatchToProps = (dispatch) => ({
  handleSetFullTime: (fullTime: boolean) => dispatch(setFullTime(fullTime)),
  handleSetLocationSearch: (locationSearch: string) =>
    dispatch(setLocationSearch(locationSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
