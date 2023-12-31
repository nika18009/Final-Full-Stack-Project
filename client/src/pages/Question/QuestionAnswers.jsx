import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";
import { getQuestionAnswers } from "../../api/answers";
import NewAnswerActions from "./AnswerActions";
import EditAnswer from "../EditQuestion/EditAnswer";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import "./Question.scss";

const QuestionAnswers = ({ id }) => {
  const [question, setQuestion] = useState([]);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const { isLoggedIn, userId } = useContext(UserContext);
  const [clickedLikes, setClickedLikes] = useState([]);
  const [clickedDislikes, setClickedDislikes] = useState([]);

  useEffect(() => {
    getQuestionAnswers(id)
      .then((response) => {
        setQuestion(response);
        console.log(question);
        initializeClickedStates(response[0].answers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const initializeClickedStates = (answers) => {
    const initialClickedLikes = new Array(answers.length).fill(false);
    setClickedLikes(initialClickedLikes);
    const initialClickedDislikes = new Array(answers.length).fill(false);
    setClickedDislikes(initialClickedDislikes);
  };

  const handleEditAnswer = (answerId) => {
    if (editingAnswerId === answerId) {
      setEditingAnswerId(null);
    } else {
      setEditingAnswerId(answerId);
    }
  };

  const handleLikeClick = (index) => {
    const updatedClickedLikes = [...clickedLikes];
    const updatedClickedDislikes = [...clickedDislikes];

    updatedClickedLikes[index] = !updatedClickedLikes[index];
    updatedClickedDislikes[index] = false;

    setClickedLikes(updatedClickedLikes);
    setClickedDislikes(updatedClickedDislikes);
  };

  const handleDislikeClick = (index) => {
    const updatedClickedLikes = [...clickedLikes];
    const updatedClickedDislikes = [...clickedDislikes];

    updatedClickedDislikes[index] = !updatedClickedDislikes[index];
    updatedClickedLikes[index] = false;

    setClickedLikes(updatedClickedLikes);
    setClickedDislikes(updatedClickedDislikes);
  };

  return (
    <div>
      {question.length > 0 &&
        question[0].answers.map((answer, index) => (
          <div key={answer._id}>
            <div className="singleAnswerCard">
              <div className="answerSection">
                <p>{answer.description}</p>
                {isLoggedIn && userId === answer.user_id && (
                  <NewAnswerActions
                    id={answer._id}
                    onEditAnswer={() => handleEditAnswer(answer._id)}
                  />
                )}
              </div>

              <div className="editedsection">
                {isLoggedIn && (
                  <p className="likeDislikeSection">
                    <button
                      className={clickedLikes[index] ? "likeB green" : "white"}
                      onClick={() => handleLikeClick(index)}
                    >
                      <FaThumbsUp /> Like
                    </button>
                    <button
                      className={
                        clickedDislikes[index] ? "dislikeB red" : "white"
                      }
                      onClick={() => handleDislikeClick(index)}
                    >
                      <FaThumbsDown /> Dislike
                    </button>
                  </p>
                )}

                {answer.updatedAt && <h5>Edited</h5>}
              </div>
            </div>
            <div className="editAnswer">
              {editingAnswerId === answer._id && <EditAnswer answer={answer} />}
            </div>
          </div>
        ))}
    </div>
  );
};

QuestionAnswers.propTypes = {
  id: PropTypes.string,
};
export default QuestionAnswers;
