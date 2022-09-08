export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  success: any;
  id?: number;
  name: string;
  email: string;
  accessToken: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}
