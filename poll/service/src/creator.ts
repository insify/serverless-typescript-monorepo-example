import { APIGatewayEvent } from "aws-lambda";
import { Response, response } from "./response";
import { store, PollItem } from "./persister";
import { Poll } from "@poll/model";
import shortid from "shortid";
import { failure } from "./result-model";

export const create = async (event: APIGatewayEvent): Promise<Response> => {
  const pollOrError = toPoll(event);
  if (typeof pollOrError === "string") {
    return response(failure(pollOrError));
  }
  const item = createItem(pollOrError);
  return response(await store(item));
};

const createItem = (poll: Poll): PollItem => {
  const id = shortid.generate();
  const item = { id, poll } as PollItem;
  poll.options.forEach((_, index) => (item[`${index}`] = 0));
  return item;
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
