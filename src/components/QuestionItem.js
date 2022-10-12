import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      console.log(question)
      onDeleteQuestion(question)
    })
  }

  const handleAnswerClick = (event) => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: event.target.value
      })
    })
    .then(r => r.json())
    .then((answer) => {
      console.log(answer)
      // onUpdateAnswer(json)
    })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerClick} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
