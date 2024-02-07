function Point({ point, maxPoint, numQuestions, index }) {
  return (
    <div>
      <progress max={numQuestions} value={index} />
      <div className="pointQuestion">
        <p>{`${index + 1} / ${numQuestions}`}</p>
        <p>{`${point} /${maxPoint}`}</p>
      </div>
    </div>
  );
}

export default Point;
