export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface RegisterResponseData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  token?: string;
  user?: User;
  data?: RegisterResponseData;
}
