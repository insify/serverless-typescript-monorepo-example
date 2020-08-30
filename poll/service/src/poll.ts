import { APIGatewayEvent } from "aws-lambda";
import { Response, response } from "./response";
import { Poll } from "@poll/model";
import { store, getPollById, countVote, getSummary } from "./persister";
import { failure } from "./result-model";

export const create = async (event: APIGatewayEvent): Promise<Response> => {
  const pollOrError = toPoll(event);
  if (typeof pollOrError === "string") {
    return response(failure(pollOrError));
  }
  return response(await store(pollOrError));
};

export const getPoll = async (event: APIGatewayEvent): Promise<Response> => {
  if (!event.pathParameters?.id) {
    return response(failure("Please provide a poll id"));
  }
  return response(await getPollById(event.pathParameters.id));
};

export const vote = async (event: APIGatewayEvent): Promise<Response> => {
  if (!event.body) {
    return response(failure("Please provide an answer id"));
  }
  if (!event.pathParameters?.id) {
    return response(failure("Please provide a poll id"));
  }
  const { option } = JSON.parse(event.body);
  const result = await countVote(event.pathParameters.id, Number(option));
  return response(result);
};

export const summary = async (event: APIGatewayEvent): Promise<Response> => {
  if (!event.pathParameters?.id) {
    return response(failure("Please provide a poll id"));
  }
  return response(await getSummary(event.pathParameters.id));
};

const toPoll = (event: APIGatewayEvent): Poll | string => {
  if (!event.body) {
    return "Please provide data.";
  }
  const poll = JSON.parse(event.body) as Poll;
  if (!poll.topic) {
    return "Please provide a topic.";
  }
  if (!poll.options || poll.options.length <= 1) {
    return "Please provide more than one answer";
  }
  return poll;
};
