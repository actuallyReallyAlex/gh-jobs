import * as React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getJobDetails } from "../api/github";

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
    <div>
      <h2>DETAILS</h2>
      {data && (
        <div>
          <span>Company: {data.company}</span>
          <span>Company Logo: {data.company_logo}</span>
          <span>Company URL: {data.company_url}</span>
          <span>Created At: {data.created_at}</span>
          <ReactMarkdown source={data.how_to_apply} />
          <span>ID: {data.id}</span>
          <ReactMarkdown source={data.description} />
          <span>Location: {data.location}</span>
          <span>Title: {data.title}</span>
          <span>Type: {data.type}</span>
          <span>URL: {data.url}</span>
        </div>
      )}
    </div>
  );
};

export default Details;
