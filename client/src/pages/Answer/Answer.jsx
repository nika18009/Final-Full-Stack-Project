import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormItem/FormItem";
import { UserContext } from "../../contexts/UserContex";
import { createAnswer, updateAnswer } from "../../api/answers";

import "../NewQuestion/NewQuestion.scss";

const NewAnswer = ({ question, answer }) => {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");

  const isEditing = !!answer;
 

  useEffect(() => {
    if (isEditing) {
      setDescription(answer.description);
    }
  }, [isEditing, answer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittingAnswer = {
      user_id: user._id,
      question_id: question._id,
      description,
      createdAt: new Date(),
    };

    const saveAnswer = isEditing ? updateAnswer : createAnswer;
    const savingAnswer = isEditing
      ? { _id: answer._id, ...submittingAnswer }
      : submittingAnswer;

    saveAnswer(savingAnswer)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="newQuestionCard">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Enter your answer"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">{isEditing ? "Edit" : "Post"} Answer</Button>
      </form>
    </div>
  );
};

NewAnswer.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string,
    user_id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  answer: PropTypes.shape({
    _id: PropTypes.string,
    user_id: PropTypes.string,
    question_id: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

export default NewAnswer;
