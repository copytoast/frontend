export interface ProblemSet<T> {
  problems: T[];
}

export interface MatchingProblem {
  questionWordId: number;
  questionWord: string;
  memoryRate: number;
  answerWords: string[];
  optionWords?: string[];
}

export interface OrderProblem {
  answerWords: {
    id: number;
    word: string;
  }[];
  memoryRate: number;
}

export interface ListProblem {
  answerWords: {
    id: number;
    word: string;
  }[];
  memoryRate: number;
}

export interface ClassifyProblem {
  // TODO
}

export interface BlankProblem {
  // TOOD
}
