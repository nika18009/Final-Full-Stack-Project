import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, generatePath } from "react-router-dom";
import { Link } from "react-router-dom";
import { getQuestion } from "../../api/questions";

import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { QUESTION_ANSWER_ROUTE } from "../../routes/const";
import QuestionActions from "./QuestionActions";
import NewAnswerActions from "./AnswerActions";
import NewAnswer from "../Answer/Answer";
import QuestionAnswers from "./QuestionAnswers";
import "./Question.scss";
import EditAnswer from "../EditQuestion/EditAnswer";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const questionData = await getQuestion(id);
        console.log(questionData);
        setQuestion(questionData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!question) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <div className="questionCard">
        <QuestionActions id={question._id} />
        <div>
          <h1>{question.title}</h1>
          <p>{question.description}</p>
        </div>
      </div>
      <div className="answerCard">
        <div className="answerCardTitle">
          <h2>Answers</h2>
          <QuestionAnswers id={question._id} />
        </div>
      </div>

      <div>
        <NewAnswer question={question} answer={null} />
      </div>

      {/* <NewAnswerActions
        id={question._id}
        onEditAnswer={handleEditAnswer}
      /> */}
    </div>
  );
};

export default Question;
