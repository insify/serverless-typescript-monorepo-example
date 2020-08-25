import React from "react";
import "./App.css";

type Props = {
  toShare: string;
  toSeeResults: string;
};

const PollInfo = (props: Props) => {
  const fullUrl = `${window.location.protocol}//${window.location.host}${props.toShare}`;
  return (
    <div>
      <div>
        Poll URL to share: <a href={props.toShare}>{fullUrl}</a>
      </div>
      <p />
      <div>
        Please go <a href={props.toSeeResults}>here</a> to see the results.
      </div>
    </div>
  );
};

export default PollInfo;
