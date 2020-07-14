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
        backgroundImage: 'url("/assets/backgroundImg.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "0.5rem",
        padding: "35px 20%",
      }}
    >
      <div
        style={{
          alignItems: "stretch",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div
          style={{
            borderTopLeftRadius: "0.25rem",
            borderBottomLeftRadius: "0.25rem",
            display: "flex",
            marginRight: "-1px",
            padding: ".375rem .75rem",
            paddingRight: "0",
            backgroundColor: "#fff",
            alignItems: "center",
            textAlign: "center",
            border: "1px solid rgba(206, 212, 218, 1)",
            borderRight: "none", // ? Need this?
          }}
        >
          <i className="material-icons grey icon-sm">work_outline</i>
        </div>
        <input
          aria-label="Title, companies, expertise or benefits"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Title, companies, expertise or benefits"
          style={{
            backgroundClip: "padding-box",
            backgroundColor: "#fff",
            border: "1px solid #ced4da",
            borderRight: "none",
            borderLeft: "none", // ? Need this?
            // borderRadius: ".25rem",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            color: "#495057",
            flex: "1 1 auto",
            // fontSize: "1rem",
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
              backgroundColor: "rgba(27, 108, 205, 1)",
              border: "3px solid rgba(255, 255, 255, 1)",
              borderTopRightRadius: "0.25rem",
              borderBottomRightRadius: "0.25rem",
              color: "#fff",
              cursor: "pointer",
              display: "inline-block",
              // fontSize: "1rem",
              fontWeight: 400,
              lineHeight: "1.5",
              padding: ".375rem 3rem",
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
    </div>
  );
};

export default SearchInput;
