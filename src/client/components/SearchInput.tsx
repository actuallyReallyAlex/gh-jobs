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
    <div
      style={{
        alignItems: "stretch",
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <input
        aria-label="Title, companies, expertise or benefits"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Title, companies, expertise or benefits"
        style={{
          backgroundClip: "padding-box",
          backgroundColor: "#fff",
          border: "1px solid #ced4da",
          borderRadius: ".25rem",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          color: "#495057",
          flex: "1 1 auto",
          fontSize: "1rem",
          fontWeight: 400,
          height: "calc(1.5em + .75rem + 2px)",
          lineHeight: "1.5",
          marginBottom: "0",
          minWidth: "0",
          padding: ".375rem .75rem",
          transition:
            "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
          width: "1%",
        }}
        type="text"
        value={search}
      />
      <div
        style={{
          display: "flex",
          marginLeft: "-1px",
        }}
      >
        <button
          onClick={() => {}}
          style={{
            backgroundColor: "transparent",
            border: "1px solid transparent",
            borderColor: "#6c757d",
            borderBottomRightRadius: "0",
            borderRadius: ".25rem",
            borderTopRightRadius: "0",
            color: "#6c757d",
            cursor: "pointer",
            display: "inline-block",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "1.5",
            padding: ".375rem .75rem",
            position: "relative",
            textAlign: "center",
            transition:
              "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
            userSelect: "none",
            verticalAlign: "middle",
            zIndex: 2,
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
