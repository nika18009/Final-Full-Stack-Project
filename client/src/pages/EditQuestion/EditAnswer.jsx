import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getQuestion } from "../../api/questions";
import NewAnswer from "../Answer/Answer";
import Loader from "../../components/Loader/Loader";

const EditAnswer = ({ answer }) => {
  const [questionId, setQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getQuestion(answer.question_id)
      .then((response) => {
        setQuestionId(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [answer.question_id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!questionId) {
    return <div>Question not found</div>;
  }

  return <NewAnswer answer={answer} question={questionId} />;
};

EditAnswer.propTypes = {
  answer: PropTypes.shape({
    _id: PropTypes.string,
    user_id: PropTypes.string,
    question_id: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};
export default EditAnswer;
