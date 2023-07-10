import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { deleteQuestion } from "../../api/questions";
import { MAIN_ROUTE, EDIT_QUESTION_ROUTE } from "../../routes/const";
import "./Question.scss";

const QuestionActions = ({ id }) => {
  const navigate = useNavigate();

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

  return (
    <div className="question-actions">
      <Button onClick={handleEdit}>Edit Question</Button>
      <Button onClick={handleDelete} color="error">
        Delete Question
      </Button>
    </div>
  );
};

QuestionActions.propTypes = {
  id: PropTypes.string,
};

export default QuestionActions;
