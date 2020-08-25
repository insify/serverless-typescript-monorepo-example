import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreatePoll from "./CreatePoll";
import Vote from "./Vote";
import Summary from "./Summary";
import { SUMMARY, VOTE } from "./Routes";

const App = () => {
  return (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={SUMMARY} component={Summary} />
        <Route path={VOTE} component={Vote} />
        <Route component={CreatePoll} />
      </Switch>
    </div>
  </BrowserRouter>);
};

export default App;
