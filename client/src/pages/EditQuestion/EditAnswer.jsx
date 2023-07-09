import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionAnswer } from "../../api/answers";
import NewAnswer from "../Answer/Answer";
import Loader from "../../components/Loader/Loader";

const EditAnswer = ({ answer }) => {
  // const { id } = useParams();
  const [questionId, setQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log(answer._id);
    getQuestionAnswer(answer._id)
      .then((response) => {
        setQuestionId(response.question_id);
        console.log(response.question_id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [answer._id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!questionId) {
    return <div>Question not found</div>;
  }

  return <NewAnswer answer={answer} question={questionId} />;
};
export default EditAnswer;
