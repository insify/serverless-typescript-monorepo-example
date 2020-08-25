import React from "react";
import { PollSummary } from "@poll/model";
import "./App.css";

type Props = {
  summary: PollSummary;
};

const PollSummaryView = (props: Props) => {
  const results = Object.entries(props.summary.result).map(option => {
    return (
      <div className="row">
        <label className="ten columns">{option[0]}</label>
        <label className="two columns">{option[1]}</label>
      </div>
    );
  });

  return (
    <div>
      <div className="row">
        <label className="question">{props.summary.topic}</label>
      </div>
      {results}
    </div>
  );
};

export default PollSummaryView;
