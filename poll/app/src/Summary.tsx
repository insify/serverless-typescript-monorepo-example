import { PollSummary } from "@poll/model";
import React, { useState, useEffect } from "react";
import "./App.css";
import { getPollSummary } from "./PollClient";
import PollSummaryView from "./PollSummary";

const emptyPollSummary: PollSummary = {
  topic: "",
  result: {},
};

const Summary = () => {
  const [pollSummary, setPollSummary] = useState(emptyPollSummary);
  const pollId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    getPollSummary(pollId).then(setPollSummary);
  }, [pollId]);

  return (
    <div className="container App">
      {pollSummary.topic.length > 0 ? (
        <PollSummaryView summary={pollSummary}></PollSummaryView>
      ) : (
        <div>Retrieving poll summary...</div>
      )}
    </div>
  );
};

export default Summary;
