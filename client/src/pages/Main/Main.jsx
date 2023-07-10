import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { getQuestions } from "../../api/questions";
import { QUESTION_ROUTE, NEW_QUESTION_ROUTE } from "../../routes/const";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";
import Button from "../../components/Button/Button";
import QuestionSorting from "../../components/QuestionSorting/QuestionSorting";
import "./Main.scss";

import QuestionCard from "../../components/QuestionCard/QuestionCard";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getQuestions(sortOption, filterOption)
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortOption, filterOption]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

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
        <QuestionSorting
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="questionsArea">
        {questions.map((question) => (
          <Link
            key={question._id}
            to={generatePath(QUESTION_ROUTE, { id: question._id })}
          >
            <QuestionCard
              title={question.title}
              description={question.description}
              answerCount={question.answers.length}
              createdDate={
                question.createdAt &&
                new Date(question.createdAt).toLocaleDateString()
              }
              updatedAt={question.updatedAt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Main;
