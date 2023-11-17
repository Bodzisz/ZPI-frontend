export interface User {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
}

export interface UserRegistrationRequest {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "USER";
}
