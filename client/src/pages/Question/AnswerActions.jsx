// import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { deleteAnswer } from "../../api/answers";
import "./Question.scss";

const NewAnswerActions = ({ id, onEditAnswer }) => {
  const handleDelete = () => {
    deleteAnswer(id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="question-actions">
      <Button onClick={onEditAnswer}>Edit</Button>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
    </div>
  );
};

NewAnswerActions.propTypes = {
  id: PropTypes.string.isRequired,
  onEditAnswer: PropTypes.func.isRequired,
};

export default NewAnswerActions;
