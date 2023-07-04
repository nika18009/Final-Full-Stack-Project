import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
};

export const createUser = async (newUser) => {
  const response = await axios.post("http://localhost:3000/users", newUser);
  return response.data;
};
