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
        onChange={(e) => setFullTime(e.target.checked)}
        value="full-time"
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
