import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import NewQuestion from "../NewQuestion/NewQuestion";
import Loader from "../../components/Loader/Loader";

const EditQuestion = () => {
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
    return <div>Question not found</div>;
  }

  return <NewQuestion question={question} />;
};

export default EditQuestion;
