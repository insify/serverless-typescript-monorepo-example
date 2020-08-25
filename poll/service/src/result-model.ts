import { AWSError } from "aws-sdk";

export class Result<R> {
  result: R | undefined;
  error: Error | undefined;
}

export const fromAwsError = <R>(error: AWSError): Result<R> => {
  return failure(error.message);
};

export const propagateFailure = <R, T>(result: Result<T>): Result<R> => {
    return failure<R>(result.error!.message);
}

export const failure = <R>(message: string): Result<R> => {
  return {
    error: new Error(message),
    result: undefined,
  };
};

export const success = <R>(result: R): Result<R> => {
  return {
    error: undefined,
    result,
  };
};
