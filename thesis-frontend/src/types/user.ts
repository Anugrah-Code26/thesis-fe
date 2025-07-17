export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  SUPERVISOR = "SUPERVISOR",
  EXAMINER = "EXAMINER"
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: UserRole[];
}

export interface Student extends User {
  studentId: string;
  department: string;
}

export interface Supervisor extends User {
  faculty: string;
  department: string;
}

export interface Examiner extends User {
  faculty: string;
  department: string;
}

export interface UserDTO {
  username: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  faculty?: string;
}