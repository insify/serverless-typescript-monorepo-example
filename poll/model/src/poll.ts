export interface Poll {
  topic: string;
  options: string[];
}

export interface OptionId {
  option: number;
}

export const emptyPoll = {
  topic: "",
  options: ["", "", "", "", ""],
};

export interface PollResult {
  [name: string]: number;
}

export interface PollSummary {
  topic: string;
  result: PollResult;
}
