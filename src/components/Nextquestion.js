function Nextquestion({ dispatch, finished, answer, index, numQuestions }) {
  const GetNext = answer !== null;

  if (index < numQuestions - 1)
    return (
      <div>
        {GetNext && (
          <button
            className="nextQuestion"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            next
          </button>
        )}
      </div>
    );
}

export default Nextquestion;
