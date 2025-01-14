'use client';

import { useReducer, useMemo, createContext, ReactElement } from 'react';

const initState: StateType = {
  orig: '',
  origArr: [],
  learner: '',
  learnerArr: [],
  resultsArr: [],
  stats: { origCount: 0, learnerCount: 0, percent: 0 },
};

export const ACTION = {
  ORIGINAL: 'ORIGINAL',
  LEARNER: 'LEARNER',
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTION.ORIGINAL: {
      const origArr = action.payload.replaceAll('  ', ' ').replaceAll(/\s\n/g, '\n').split(/\s|\n/);

      const resArr: ResultsType[] = [];
      origArr.forEach((word, i) => {
        resArr.push({
          pos: i,
          word,
          match: word === state.learnerArr[i],
        });
      });

      const wordCount = origArr.filter((word) => word).length;
      const correctArr = resArr.map((obj) => obj.match).filter((obj) => obj);

      let percent = 0;
      if (resArr.length && correctArr.length && wordCount) {
        percent = parseFloat(((correctArr.length / resArr.length) * 100).toFixed(2));
      }

      return {
        ...state,
        orig: action.payload,
        origArr,
        resultsArr: resArr,
        stats: {
          ...state.stats,
          origCount: wordCount,
          percent,
        },
      };
    }
    case ACTION.LEARNER: {
      const learnerArr = action.payload
        .replaceAll('  ', ' ')
        .replaceAll(/\s\n/g, '\n')
        .split(/\s|\n/);

      const resArr: ResultsType[] = [];
      state.origArr.forEach((word, i) => {
        resArr.push({
          pos: i,
          word,
          match: word === learnerArr[i],
        });
      });

      const wordCount = learnerArr.filter((word) => word).length;
      const correctArr = resArr.map((obj) => obj.match).filter((obj) => obj);

      let percent = 0;
      if (resArr.length && correctArr.length && wordCount) {
        percent = parseFloat(((correctArr.length / resArr.length) * 100).toFixed(2));
      }

      return {
        ...state,
        learner: action.payload,
        learnerArr,
        resultsArr: resArr,
        stats: {
          ...state.stats,
          learnerCount: wordCount,
          percent,
        },
      };
    }
    default:
      throw new Error();
  }
};

const useTextContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const ACTIONS = useMemo(() => {
    return ACTION;
  }, []);

  const results = state.resultsArr.map((res, i) => {
    if (i >= state.learnerArr.length - 1) return;
    if (res.match)
      return (
        <span key={i.toString()} className="bg-green-500 p-2 leading-4 border rounded">
          {res.word}
        </span>
      );
    else
      return (
        <span key={i.toString()} className="bg-red-500 border p-2 leading-4 rounded">
          {res.word}
        </span>
      );
  });

  return {
    dispatch,
    ACTIONS,
    results,
    orig: state.orig,
    learner: state.learner,
    origCount: state.stats.origCount,
    learnerCount: state.stats.learnerCount,
    percent: state.stats.percent,
  };
};

export type UseTextContextType = ReturnType<typeof useTextContext>;

const initTextContextState: UseTextContextType = {
  dispatch: () => {},
  ACTIONS: ACTION,
  orig: '',
  learner: '',
  results: [],
  origCount: 0,
  learnerCount: 0,
  percent: 0,
};

const TextContext = createContext<UseTextContextType>(initTextContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const TextProvider = ({ children }: ChildrenType): ReactElement => {
  return <TextContext.Provider value={useTextContext(initState)}>{children}</TextContext.Provider>;
};

export default TextContext;
