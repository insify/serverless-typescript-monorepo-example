import { APIGatewayEvent } from "aws-lambda";
import { Response, response } from "./response";
import { Poll } from "@poll/model";
import {
  store,
  getPollById,
  countVote,
  getSummary as getPollSummary,
} from "./persister";

export const create = async (event: APIGatewayEvent): Promise<Response> => {
  return response(await store(toPoll(event)));
};

export const getPoll = async (event: APIGatewayEvent): Promise<Response> => {
  return response(await getPollById(getId(event)));
};

export const vote = async (event: APIGatewayEvent): Promise<Response> => {
  ensure(() => !!event.body, "Please provide an answer id");
  const { option } = JSON.parse(event.body!);
  const result = await countVote(getId(event), parseInt(option));
  return response(result);
};

export const getSummary = async (event: APIGatewayEvent): Promise<Response> => {
  return response(await getPollSummary(getId(event)));
};

const toPoll = (event: APIGatewayEvent): Poll => {
  ensure(() => !!event.body, "Please provide a topic");
  const poll = JSON.parse(event.body!) as Poll;
  ensure(() => !!poll.topic, "Please provide a topic");
  ensure(
    () => !!poll.options && poll.options.length > 1,
    "Please provide more than one answer"
  );
  return poll;
};

const ensure = (expr: () => boolean, message: string) => {
  if (!expr()) {
    throw new Error(message);
  }
};

const getId = (event: APIGatewayEvent): string => {
  const id = event.pathParameters?.id;
  ensure(() => !!id, "Please provide a poll id");
  return id!;
};
