import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import NewAnswer from "../Answer/Answer";
import Loader from "../../components/Loader/Loader";

const EditAnswer = ({ answer }) => {
  // const { id } = useParams();
  const [questionId, setQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log(answer.question_id);
    getQuestion(answer.question_id)
      .then((response) => {
        setQuestionId(response);
        console.log(response);
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
export default EditAnswer;
