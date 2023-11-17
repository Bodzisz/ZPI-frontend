export interface AuthRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: "USER";
}

export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: string;
}
