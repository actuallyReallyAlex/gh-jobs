import * as React from "react";
import Checkbox from "./Checkbox";

export interface OptionsPanelProps {
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocationSearch: () => void;
  locationSearch: string;
  setFullTime: (fullTime: boolean) => void;
  setLocationSearch: (locationSearch: string) => void;
}

const OptionsPanel: React.SFC<OptionsPanelProps> = (
  props: OptionsPanelProps
) => {
  const {
    handleCheckBox,
    handleLocationSearch,
    locationSearch,
    setFullTime,
    setLocationSearch,
  } = props;
  return (
    <div className="options-panel__container">
      <Checkbox
        label="Full Time"
        onChange={(e) => setFullTime(e.target.checked)}
        value="full-time"
      />

      <label htmlFor="location-1">Chicago</label>
      <input
        id="location-1"
        name="location1"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="Chicago"
      />
      <label htmlFor="location-2">Los Angeles</label>
      <input
        id="location-2"
        name="location2"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="Los Angeles"
      />
      <label htmlFor="location-3">New York City</label>
      <input
        id="location-3"
        name="location3"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="New York City"
      />
      <label htmlFor="location-4">San Francisco</label>
      <input
        id="location-4"
        name="location4"
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        value="San Francisco"
      />
      <label htmlFor="location-search">Location Search</label>
      <input
        id="location-search"
        onChange={(e) => setLocationSearch(e.target.value)}
        type="text"
        value={locationSearch}
      />
      <button onClick={() => handleLocationSearch()}>Search</button>
    </div>
  );
};

export default OptionsPanel;
