import Options from "./Options";

function Questions({ questions, answer, dispatch }) {
  const { question, options, points, correctOption } = questions;

  return (
    <div>
      <h3> {question}</h3>

      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
}

export default Questions;
