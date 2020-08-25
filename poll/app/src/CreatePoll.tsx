import React, { useState } from "react";
import "./App.css";
import { createPoll } from "./PollClient";
import { Poll, emptyPoll } from "@poll/model";
import PollForm from "./PollForm";
import PollInfo from "./PollInfo";
import { SUMMARY, VOTE } from "./Routes";

const CreatePoll = () => {
  const [pollId, setPollId] = useState("");

  const create = (qa: Poll) => {
    createPoll({ ...qa })
      .then(setPollId)
      .catch(console.error);
  };

  return (
    <div className="container App">
      {pollId.length === 0 ? (
        <PollForm poll={emptyPoll} submit={create} />
      ) : (
        <PollInfo
          toShare={`${VOTE}/${pollId}`}
          toSeeResults={`${SUMMARY}/${pollId}`}
        />
      )}
    </div>
  );
};

export default CreatePoll;
