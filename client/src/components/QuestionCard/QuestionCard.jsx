import "./QuestionCard.scss";

const QuestionCard = ({ title, description }) => {
  return (
    <div className="question-card">
      <h3 className="title">{title}</h3>
      <p className="title">{description}</p>
      <p className="questionInformation">Empty</p>
    </div>
  );
};

export default QuestionCard;
