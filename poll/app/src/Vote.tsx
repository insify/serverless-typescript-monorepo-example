import React, { useState, useEffect } from "react";
import "./App.css";
import { emptyPoll } from "@poll/model";
import { getPoll, vote } from "./PollClient";
import VoteForm from "./VoteForm";
import { useLocation } from 'react-router-dom';

const Vote = () => {
  const [poll, setPoll] = useState(emptyPoll);
  const [voteProvided, setVoteProvided] = useState(false);
  const location = useLocation();
  const pollId = location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    getPoll(pollId).then(setPoll);
  }, [pollId]);

  const voted = (option: number) => {
    vote(pollId, option).then(_ => setVoteProvided(true));
  };

  return (
    <div className="container App">
      {poll ? (
        voteProvided ? (
          <div>Thank you!</div>
        ) : (
          <VoteForm poll={poll} vote={voted} />
        )
      ) : (
        <div>Retrieving poll...</div>
      )}
    </div>
  );
};

export default Vote;
