import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false)
  const [result, setResult] = useState("")

  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    console.log(`#${randomColor}`);
    return `#${randomColor}`;
  };

  const setGame = () => {
    const correctColor = getRandomColor();
    setColor(correctColor);
    setAnswers(
      [correctColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  }

  useEffect(() => {
    // TODO: generate random color
    setGame()
  }, []);

  function handleAnswer() {
    setResult(() => {
      if (isCorrect) {
        setGame()
        return <h3 className="correct">Correct!</h3>
      } else {
        return <h3 className="wrong">Wrong!</h3>
      } 
    })
  }

  function handleAnswerCLicked(answer) {
    if (answer === color) {
      setIsCorrect(true)
      handleAnswer()
      console.log("Correct")
    } else {
      setIsCorrect(false)
      handleAnswer() 
      console.log("Wrong")
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="guess-color" style={{ background: color }}></div>
        <div className="buttons">
          {answers.map((answer) => (
            <button onClick={() => handleAnswerCLicked(answer)} key={answer}>{answer}</button>
          ))}
        </div>
        {result || ""}
      </div>
    </div>
  );
}
