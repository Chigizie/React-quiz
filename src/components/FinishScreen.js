function FinishScreen({ point, maxPoint, dispatch }) {
  const percentage = (point / maxPoint) * 100;

  let emoji;

  if (percentage >= 80) emoji = "🎖";
  if (percentage >= 60 && percentage < 80) emoji = "🍾";
  if (percentage >= 50 && percentage < 60) emoji = "😊";
  if (percentage >= 30 && percentage < 50) emoji = "☹";
  if (percentage < 30) emoji = "😭";

  return (
    <>
      <h3>
        {`${emoji} You scored ${point} out of ${maxPoint}
        points
        ${Math.ceil(percentage)} %`}
      </h3>

      <button onClick={() => dispatch({ type: "restart" })}>Restart</button>
    </>
  );
}
export default FinishScreen;
