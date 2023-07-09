import { useContext, useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";
// import { ObjectId } from "mongodb";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormItem/FormItem";
import { UserContext } from "../../contexts/UserContex";
import { createAnswer, updateAnswer } from "../../api/answers";
import { MAIN_ROUTE, QUESTION_ROUTE } from "../../routes/const";
import "../NewQuestion/NewQuestion.scss";

const NewAnswer = ({ question, answer }) => {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");

  const isEditing = !!answer;
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      setDescription(answer.description);
    }
  }, [isEditing, answer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittingAnswer = {
      user_id: user._id,
      question_id: question,
      description,
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

export default NewAnswer;
