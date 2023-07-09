import axios from "axios";

export const getQuestionAnswers = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/questionswithAnswers/${id}`
  );
  return response.data;
};
export const getQuestionAnswer = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/question/${id}/answer`
  );
  return response.data;
};

// export const getQuestion = async (id) => {
//   const response = await axios.get(`http://localhost:3000/questions/${id}`);
//   return response.data;
// };

export const createAnswer = async (answer) => {
  const response = await axios.post("http://localhost:3000/answers", answer);
  return response.data;
};

export const updateAnswer = async (answer) => {
  const response = await axios.put(
    `http://localhost:3000/question/${answer._id}/answer`,
    answer,
    console.log(answer)
  );
  return response.data;
};

export const deleteAnswer = async (id) => {
  const response = await axios.delete(`http://localhost:3000/answers/${id}`);
  return response.data;
};
