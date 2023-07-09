import "./QuestionCard.scss";

const QuestionCard = ({ title, description, answerCount }) => {
  return (
    <div className="question-card">
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <p className="answerCount">Answer Count: {answerCount}</p>
    </div>
  );
};

export default QuestionCard;
