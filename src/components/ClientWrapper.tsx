'use client';

import TextColumn from './TextColumn';
import ResultsColumn from './ResultsColumn';
import useTexts from '../hooks/useTexts';

export default function ClientWrapper() {
  const { dispatch, ACTIONS, results, orig, learner, origCount, learnerCount, percent } =
    useTexts();

  return (
    <div className="w-full mx-auto sm:flex-grow flex flex-col-reverse sm:flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4 flex-grow">
        <TextColumn id={ACTIONS.ORIGINAL} text={orig} dispatch={dispatch} />

        <TextColumn id={ACTIONS.LEARNER} text={learner} dispatch={dispatch} />

        <ResultsColumn results={results} />
      </div>
      <div className="mb-2">
        <p>Original has {origCount} words.</p>
        <p>Learner provided {learnerCount} words.</p>
        <p>Percent correct: {percent}%</p>
      </div>
    </div>
  );
}
