import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => {
      // console.log(data)
      setQuestions(data)
    })
  }, [setQuestions])

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  const renderQuestions = () => {
    if(questions) {
      let questionNumber = 0;
      return questions.map((currentQuestion) => {
        questionNumber += 1;
        return (
          <QuestionItem 
            key={currentQuestion.id} 
            questionNumber={questionNumber} 
            question={currentQuestion} 
            questions={questions} 
            setQuestions={setQuestions} 
            onDeleteQuestion={handleDeleteQuestion}
          />
        )
      })
    }
  }

  
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* <ul>display QuestionItem components here after fetching</ul> */}
      <ul>{renderQuestions()}</ul>
    </section>
  );
}

export default QuestionList;
