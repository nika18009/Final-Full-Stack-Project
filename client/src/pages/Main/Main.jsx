import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { getQuestions } from "../../api/questions";
import { QUESTION_ROUTE, NEW_QUESTION_ROUTE } from "../../routes/const";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";
import Button from "../../components/Button/Button";
import "./Main.scss";

import QuestionCard from "../../components/QuestionCard/QuestionCard";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getQuestions()
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>There are no questions yet.</div>;
  }

  return (
    <div className="questionspage">
      <div className="newQuestionArea">
        <Button>
          <Link to={NEW_QUESTION_ROUTE}>New Question</Link>
        </Button>
      </div>

      <div className="questionsArea">
        {questions.map((question) => (
          <Link
            key={question._id}
            to={generatePath(QUESTION_ROUTE, { id: question._id })} // generatePath tik tada kai naudojam dinaminius routus
          >
            <QuestionCard
              title={question.title}
              description={question.description}
              answerCount={question.answers.length}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Main;
