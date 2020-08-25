import { Result } from "./result-model";

interface Headers {
  [name: string]: string;
}

const ALLOW_ORIGIN_HEADER = {
  "Access-Control-Allow-Origin": "*",
};

export interface Response {
  statusCode: number;
  headers: Headers;
  body: string;
}

export const response = <R>(result: Result<R>): Response => {
  const code = result.error ? 400 : 200;
  const body = result.error
    ? result.error.message
    : typeof result.result === "string"
    ? result.result
    : JSON.stringify(result.result);
  return {
    statusCode: code,
    headers: ALLOW_ORIGIN_HEADER,
    body: body,
  };
};
