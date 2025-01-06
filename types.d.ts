type ResultsType = {
  pos: number;
  word: string;
  match: boolean;
};

type StatsType = {
  origCount: number;
  learnerCount: number;
  percent: number;
};

type StateType = {
  orig: string;
  origArr: string[];
  learner: string;
  learnerArr: string[];
  resultsArr: ResultsType[];
  stats: StatsType;
};

type ActionType = {
  type: string;
  payload: string;
};
