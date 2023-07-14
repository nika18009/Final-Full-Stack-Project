import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import Loader from "../../components/Loader/Loader";
import QuestionActions from "./QuestionActions";
import NewAnswer from "../Answer/Answer";
import QuestionAnswers from "./QuestionAnswers";
import "./Question.scss";

const Question = () => {
  const { id } = useParams();
  const { isLoggedIn } = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        {isLoggedIn && (
          <QuestionActions id={question._id} question={question} />
        )}
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

      {isLoggedIn && (
        <div>
          <NewAnswer question={question} />
        </div>
      )}
    </div>
  );
};

export default Question;
