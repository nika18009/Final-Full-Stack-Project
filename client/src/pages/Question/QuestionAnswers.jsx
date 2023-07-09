import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { getQuestionAnswers } from "../../api/answers";
import NewAnswerActions from "./AnswerActions";
import EditAnswer from "../EditQuestion/EditAnswer";

const QuestionAnswers = ({ id }) => {
  const [question, setQuestion] = useState([]);
  const [editingAnswerId, setEditingAnswerId] = useState(null);

  useEffect(() => {
    console.log("Fetching question answers for ID:", id);
    getQuestionAnswers(id)
      .then((response) => {
        setQuestion(response);
        console.log(question);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleEditAnswer = (answerId) => {
    setEditingAnswerId(answerId);
  };

  return (
    <div>
      <h2>Answers ({question.length > 0 && question[0].answers.length})</h2>
      {question.length > 0 &&
        question[0].answers.map((answer) => (
          <div key={answer._id}>
            <div className="singleAnsweCard">
              <p>{answer.description}</p>
              <NewAnswerActions
                id={answer._id}
                onEditAnswer={() => handleEditAnswer(answer._id)}
              />
            </div>
            {editingAnswerId === answer._id && <EditAnswer answer={answer} />}
          </div>
        ))}
    </div>
  );
};

export default QuestionAnswers;
