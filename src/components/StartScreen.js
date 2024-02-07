function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to The react Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button onClick={() => dispatch({ type: "start" })}>Lets start</button>
    </div>
  );
}

export default StartScreen;
