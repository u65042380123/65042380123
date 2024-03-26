import React, { useEffect, useState } from "react"
import "./App.css"

const App = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error))
  }, [])

  const handleShowAnswer = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return { ...question, showAnswer: true }
        }
        return question
      })
    )
  }

  return (
    <div className="container">
      <h1 className="title">Trivia App</h1>
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <h3 className="question">{question.question}</h3>
          {question.showAnswer ? (
            <p className="answer">Answer: {question.answer}</p>
          ) : (
            <button
              className="show-answer-button"
              onClick={() => handleShowAnswer(question.id)}
            >
              Show Answer
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default App