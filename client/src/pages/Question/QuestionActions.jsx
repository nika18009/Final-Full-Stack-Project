import { useNavigate, generatePath } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { deleteQuestion } from "../../api/questions";
import { MAIN_ROUTE, EDIT_QUESTION_ROUTE } from "../../routes/const";
import "./Question.scss";

const QuestionActions = ({ id, question }) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const handleDelete = () => {
    deleteQuestion(id)
      .then(() => {
        navigate(MAIN_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    const path = generatePath(EDIT_QUESTION_ROUTE, { id });
    navigate(path);
  };

  if (userId === question.user_id) {
    return (
      <div className="question-actions">
        <Button onClick={handleEdit}>Edit Question</Button>
        <Button onClick={handleDelete} color="error">
          Delete Question
        </Button>
      </div>
    );
  }

  return null;
};
QuestionActions.propTypes = {
  id: PropTypes.string,
  question: PropTypes.shape({
    _id: PropTypes.string,
    user_id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default QuestionActions;
