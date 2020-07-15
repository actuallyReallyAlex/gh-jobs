import * as React from "react";
import { connect } from "react-redux";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { setFullTime } from "../redux/actions/application";

export interface OptionsPanelProps {
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocationSearch: () => void;
  handleSetFullTime: (fullTime: boolean) => void;
  locationSearch: string;
  setLocationSearch: (locationSearch: string) => void;
}

const OptionsPanel: React.SFC<OptionsPanelProps> = (
  props: OptionsPanelProps
) => {
  const {
    handleCheckBox,
    handleLocationSearch,
    handleSetFullTime,
    locationSearch,
    setLocationSearch,
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
        label="Full Time"
        onChange={(e) => handleSetFullTime(e.target.checked)}
        value="full-time"
      />

      <Input
        icon="public"
        id="location-search"
        label="Location"
        onChange={(e) => setLocationSearch(e.target.value)}
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

const mapDispatchToProps = (dispatch) => ({
  handleSetFullTime: (fullTime: boolean) => dispatch(setFullTime(fullTime)),
});

export default connect(null, mapDispatchToProps)(OptionsPanel);
