import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import Loader from "../../components/Loader/Loader";
import QuestionActions from "./Actions";
import "./Question.scss";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getQuestion(id)
      .then((response) => {
        setQuestion(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!question) {
    return <div>Project not found</div>;
  }

  return (
    <div className="questionCard">
      <QuestionActions id={question._id} />
      <div>
        <h1>{question.title}</h1>
        <p>{question.description}</p>
      </div>
    </div>
  );
};

export default Question;
