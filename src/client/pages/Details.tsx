import * as React from "react";
import { useParams } from "react-router-dom";
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
          <span>Company: ${data.company}</span>
          <span>Company Logo: ${data.company_logo}</span>
          <span>Company URL: ${data.company_url}</span>
          <span>Created At: ${data.created_at}</span>
          <span>How To Apply: ${data.how_to_apply}</span>
          <span>ID: ${data.id}</span>
          <span>Description: ${data.description}</span>
          <span>Location: ${data.location}</span>
          <span>Title: ${data.title}</span>
          <span>Type: ${data.type}</span>
          <span>URL: ${data.url}</span>
        </div>
      )}
    </div>
  );
};

export default Details;
