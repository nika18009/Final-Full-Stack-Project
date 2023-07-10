import axios from "axios";

export const getQuestions = async (sortOption = "", filterOption = "") => {
  let url = "http://localhost:3000/questions";

  if (sortOption) {
    url += `?sort=${sortOption}`;
  }

  if (filterOption) {
    if (sortOption) {
      url += `&filter=${filterOption}`;
    } else {
      url += `?filter=${filterOption}`;
    }
  }

  const response = await axios.get(url);
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
  const { _id, ...updatedQuestion } = question;
  const response = await axios.put(
    `http://localhost:3000/questions/${_id}`,
    updatedQuestion
  );
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`http://localhost:3000/questions/${id}`);
  return response.data;
};
