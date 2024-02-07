function Options({ options, answer, dispatch, correctOption }) {
  const hasAnwered = answer !== null;
  return (
    <div className="option-container">
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn-option ${index === answer ? "btn-option" : ""} ${
            hasAnwered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnwered}
        >
          {option}
          {console.log(correctOption, answer, index)}

          {/* {console.log()} */}
          {/* {console.log(index)} */}
        </button>
      ))}
    </div>
  );
}

export default Options;
