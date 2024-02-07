import { useEffect, useReducer } from "react";
import { Header } from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Questions from "./Questios.js";
import Nextquestion from "./Nextquestion.js";
import Point from "./Point.js";
import FinishScreen from "./FinishScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";

const SECS_PER_QUESTIOS = 20;

const initialState = {
  Questios: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "receivedData":
      return {
        ...state,
        Questios: action.payload,
        status: "ready",
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        answer: null,
      };

    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        point: 0,
        secondsRemaining: 20,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.Questios.length * SECS_PER_QUESTIOS,
      };
    case "newAnswer":
      const question = state.Questios.at(state.index);

      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,

        answer: null,
      };
    case "prevQuestion":
      return {
        ...state,
        index: state.index > 0 ? state.index - 1 : state.index,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [
    { Questios, status, index, answer, point, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPoint = Questios.reduce((pre, curr) => {
    return pre + curr.points;
  }, 0);
  console.log();
  const numQuestions = Questios.length;
  console.log(Questios.question);
  useEffect(function myFunction() {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "receivedData", payload: data });
      } catch {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  const finished = index >= Questios.length - 1;
  console.log(finished);
  console.log(Questios[1]);
  return (
    <div>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Point
              point={point}
              maxPoint={maxPoint}
              numQuestions={numQuestions}
              index={index}
            />
            <Questions
              questions={Questios[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer
                question={Questios}
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <Nextquestion
                finished={finished}
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
                index={index}
              />
              {finished && status === "start" && (
                <button onClick={() => dispatch({ type: "finish" })}>
                  finish
                </button>
              )}
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen point={point} maxPoint={maxPoint} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
export default App;
