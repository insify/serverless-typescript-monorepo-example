import { DynamoDB } from "aws-sdk";
import { Poll, PollResult, PollSummary } from "@poll/model";
import shortid from "shortid";
import { AttributeMap, DocumentClient } from "aws-sdk/clients/dynamodb";
import {
  Result,
  failure,
  fromAwsError,
  success,
  propagateFailure,
} from "./result-model";

const dynamoDb = new DynamoDB.DocumentClient();

export const store = async (poll: Poll): Promise<Result<string>> => {
  const id = shortid.generate();
  const item: any = { id, poll };
  poll.options.forEach((_, index) => (item[attrName(index)] = 0));
  const params = {
    TableName: process.env.POLL_TABLE || "",
    Item: item,
  };
  const result = await dynamoDb.put(params).promise();
  if (result.$response.error) {
    return fromAwsError(result.$response.error);
  }
  return success(id);
};

export const getPollById = async (id: string): Promise<Result<Poll>> => {
  const item = await getById(id);
  if (item.result) {
    return success(item.result["poll"] as Poll);
  }
  return propagateFailure(item);
};

export const countVote = async (
  id: string,
  optionIndex: number
): Promise<Result<string>> => {
  const params = {
    ...getByIdParams(id),
    UpdateExpression: "set #option = #option + :val",
    ExpressionAttributeNames: {
      "#option": attrName(optionIndex),
    },
    ExpressionAttributeValues: {
      ":val": 1,
    },
  };
  const result = await dynamoDb.update(params).promise();
  if (result.$response.error) {
    fromAwsError(result.$response.error);
  }
  return success(id);
};

export const getSummary = async (id: string): Promise<Result<PollSummary>> => {
  const itemOrError = await getById(id);
  if (!itemOrError.result) {
    return propagateFailure(itemOrError);
  }
  const item = itemOrError.result;
  const poll = item["poll"] as Poll;
  const result: PollResult = {};
  poll.options.forEach((option, index) => {
    result[option] = Number(item[attrName(index)]);
  });
  return success({ topic: poll.topic, result });
};

const getById = async (id: string): Promise<Result<AttributeMap>> => {
  const result = await dynamoDb.get(getByIdParams(id)).promise();
  if (result.$response.error) {
    return fromAwsError(result.$response.error);
  }
  if (!result.Item) {
    return failure(`Could not find a poll with id ${id}`);
  }
  return success(result.Item);
};

const getByIdParams = (id: string): DocumentClient.GetItemInput => {
  return {
    TableName: process.env.POLL_TABLE || "",
    Key: { id },
  };
};

const attrName = (index: number): string => {
  return `o${index}`;
};
