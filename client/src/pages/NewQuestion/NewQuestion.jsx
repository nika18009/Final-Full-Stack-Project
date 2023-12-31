import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormItem/FormItem";
import { UserContext } from "../../contexts/UserContex";
import { createQuestion, updateQuestion } from "../../api/questions";
import { MAIN_ROUTE, QUESTION_ROUTE } from "../../routes/const";
import "./NewQuestion.scss";

const NewQuestion = ({ question }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(question?.title || "");
  const [description, setDescription] = useState(question?.description || "");

  const isEditing = !!question;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittingQuestion = {
      user_id: user._id,
      title,
      description,
      createdAt: new Date(),
    };

    const saveQuestion = isEditing ? updateQuestion : createQuestion;
    const savingQuestion = isEditing
      ? { _id: question._id, ...submittingQuestion }
      : submittingQuestion;

    saveQuestion(savingQuestion)
      .then(() => {
        const route = isEditing
          ? generatePath(QUESTION_ROUTE, { id: question._id })
          : MAIN_ROUTE;
        navigate(route);
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
          label="Question Title"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          type="text"
          label="Describe your question"
          placeholder="Enter your question"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button>{isEditing ? "Edit" : "Create"} Question</Button>
      </form>
    </div>
  );
};

NewQuestion.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string,
    user_id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};
export default NewQuestion;
