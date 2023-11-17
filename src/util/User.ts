import { User } from "../api/interfaces/User";

export const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userString = localStorage.getItem("user");
  if (userString !== null) {
    console.log("USER STRING: " + userString);
    return JSON.parse(userString);
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem("user");
};
