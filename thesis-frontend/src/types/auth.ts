export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  faculty?: string;
}