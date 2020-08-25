import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { Poll } from "@poll/model";

type Props = {
  poll: Poll;
  submit: (poll: Poll) => void;
};

const PollForm = (props: Props) => {
  const [poll, setPoll] = useState(props.poll);

  const submit = () => {
    const options = poll.options.filter((opt) => opt.length > 0);
    props.submit({ topic: poll.topic, options });
  };

  const topicChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPoll({ ...poll, topic: event.target.value });
  };

  const answerChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const options = [...poll.options];
    const index = parseInt(event.target.id.substring(1)) - 1;
    options[index] = event.target.value;
    setPoll({ topic: poll.topic, options });
  };

  return (
    <div>
      <div className="row">
        <label className="three columns">Your question</label>
        <input className="nine columns" onChange={topicChanged}></input>
      </div>
      <div className="row">
        <label className="twelve columns">Possible answers (2 to 5)</label>
      </div>
      <div className="row">
        <input
          id="a1"
          className="twelve columns"
          onChange={answerChanged}
        ></input>
      </div>
      <div className="row">
        <input
          id="a2"
          className="twelve columns"
          onChange={answerChanged}
        ></input>
      </div>
      <div className="row">
        <input
          id="a3"
          className="twelve columns"
          onChange={answerChanged}
        ></input>
      </div>
      <div className="row">
        <input
          id="a4"
          className="twelve columns"
          onChange={answerChanged}
        ></input>
      </div>
      <div className="row">
        <input
          id="a5"
          className="twelve columns"
          onChange={answerChanged}
        ></input>
      </div>
      <div className="row">
        <button className="button-primary" onClick={submit}>
          Start poll
        </button>
      </div>
    </div>
  );
};

export default PollForm;
