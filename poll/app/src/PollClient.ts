import axios from "axios";
import { Poll, PollSummary } from "@poll/model";

const client = axios.create({
  baseURL: process.env.REACT_APP_POLL_SERVICE,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPoll = async (poll: Poll): Promise<string> => {
  return await (await client.post("", poll)).data;
};

export const getPoll = async (pollId: string): Promise<Poll> => {
  return (await (await client.get(pollId)).data) as Poll;
};

export const getPollSummary = async (pollId: string): Promise<PollSummary> => {
  return await (await client.get(`${pollId}/summary`)).data as PollSummary;
};

export const vote = async (pollId: string, option: number): Promise<void> => {
  await client.post(pollId, { option });
};
