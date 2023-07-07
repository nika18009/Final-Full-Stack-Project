import axios from "axios";

export const getQuestions = async () => {
  const response = await axios.get("http://localhost:3000/questions");
  return response.data;
};

export const getQuestion = async (id) => {
  const response = await axios.get(`http://localhost:3000/questions/${id}`);
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await axios.post(
    "http://localhost:3000/questions",
    question
  );
  return response.data;
};

export const updateQuestion = async (question) => {
  const response = await axios.put(
    `http://localhost:3000/questions/${question.id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`http://localhost:3000/questions/${id}`);
  return response.data;
};
