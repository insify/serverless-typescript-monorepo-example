import React, { useState, ChangeEvent } from "react";
import { Poll } from "@poll/model";
import "./App.css";

const notSelected = -1;

type Props = {
  poll: Poll;
  vote: (index: number) => void;
};

const VoteForm = (props: Props) => {
  const [selected, setSelected] = useState(notSelected);

  const submit = () => {
    if (selected !== notSelected) {
      props.vote(selected);
    }
  };

  const answerChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(parseInt(event.target.id.substr(1, 1)));
  };

  const getId = (index: number): string => "a" + index;

  const buttons = props.poll.options.map((option, index) => {
    return <div className="row">
      <input
        type="radio"
        className="one column"
        id={getId(index)}
        key={getId(index)}
        onChange={answerChanged}
        checked={index === selected}
      />
      <label className="five columns" htmlFor={getId(index)}>{option}</label>
    </div>;
  });

  return (
    <div>
      <div className="row">
        <label className="question">{props.poll.topic}</label>
      </div>
      {buttons}
      <div className="row">
        <button
          className="button-primary"
          onClick={submit}
          disabled={selected === notSelected}
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default VoteForm;
