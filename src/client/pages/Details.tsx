import * as React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getJobDetails } from "../api/github";
import { validURL } from "../util";

const Details: React.SFC<{}> = () => {
  let { id } = useParams();
  const [data, setData] = React.useState(null);
  React.useEffect((): void => {
    const getData = async () => {
      const data = await getJobDetails(id);
      console.log({ data });
      setData(data);
    };
    getData();
  }, []);
  return (
    <div className="details__container">
      <div className="details__side__container">
        <Link className="details__side__link" to="/">
          <i className="material-icons">west</i>
          <span>Back to search</span>
        </Link>
        <div className="details__container__how-to">
          <span className="details__container__label">How to Apply</span>
          {data &&
            (validURL(data.how_to_apply) ? (
              <a
                className="details__side__link"
                href={data.how_to_apply}
                rel="noopener noreferrer"
                style={{ marginTop: "16px" }}
                target="_blank"
              >
                <i className="material-icons">link</i>
                <span>Apply</span>
              </a>
            ) : (
              <ReactMarkdown
                className="details__container__apply-md"
                source={data.how_to_apply}
              />
            ))}
        </div>
      </div>

      <div className="details__main__container">
        {data && (
          <>
            <div>
              <h2 className="details__title">{data.title}</h2>
            </div>
            <span>Company: {data.company}</span>
            <span>Company Logo: {data.company_logo}</span>
            <span>Company URL: {data.company_url}</span>
            <span>Created At: {data.created_at}</span>
            <span>ID: {data.id}</span>
            <ReactMarkdown source={data.description} />
            <span>Location: {data.location}</span>
            <span>Type: {data.type}</span>
            <span>URL: {data.url}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
