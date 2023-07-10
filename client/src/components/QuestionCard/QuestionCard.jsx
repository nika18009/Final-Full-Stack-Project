import "./QuestionCard.scss";

const QuestionCard = ({
  title,
  description,
  answerCount,
  createdDate,
  updatedAt,
}) => {
  return (
    <div className="question-card">
      <div className="questionMainInformation">
        <div >
          <h3 className="title">{title}</h3>
          <p className="description">{description}</p>
        </div>
        <div>{updatedAt && <h5>Edited</h5>}</div>
      </div>
      <div className="questionInformation">
        <p className="answerCount">Total answers: {answerCount}</p>
        <p className="answerCount">Created {createdDate}</p>
      </div>
    </div>
  );
};

export default QuestionCard;
