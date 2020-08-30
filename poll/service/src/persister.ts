import { DynamoDB } from "aws-sdk";
import { Poll, PollResult, PollSummary } from "@poll/model";
import { AttributeMap, DocumentClient } from "aws-sdk/clients/dynamodb";
import {
  Result,
  failure,
  fromAwsError,
  success,
  propagateFailure,
} from "./result-model";

export interface PollItem {
  [column: string]: number | string | Poll;
  id: string;
  poll: Poll;
}

const dynamoDb = new DynamoDB.DocumentClient();

export const store = async (item: PollItem): Promise<Result<string>> => {
  const params = {
    TableName: process.env.POLL_TABLE || "",
    Item: item,
  };
  const result = await dynamoDb.put(params).promise();
  if (result.$response.error) {
    return fromAwsError(result.$response.error);
  }
  return success(item.id);
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
      "#option": `${optionIndex}`,
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
  const item = itemOrError.result as PollItem;
  const result: PollResult = {};
  item.poll.options.forEach((option, index) => {
    result[option] = Number(item[`${index}`]);
  });
  return success({ topic: item.poll.topic, result });
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
