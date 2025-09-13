// API Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'AUDITOR' | 'VIEWER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// Template Types
export interface Template {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  isArchived: boolean;
  scoringEnabled: boolean;
  maxScore?: number;
  passingScore?: number;
  createdAt: string;
  updatedAt: string;
  creator: User;
  pages: Page[];
}

export interface Page {
  id: string;
  title: string;
  description?: string;
  order: number;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  isRepeatable: boolean;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  helpText?: string;
  type: QuestionType;
  isRequired: boolean;
  order: number;
  defaultScore?: number;
  validationRules?: any;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  value: string;
  score?: number;
  order: number;
}

export type QuestionType = 
  | 'TEXT'
  | 'NUMBER'
  | 'SELECT_ONE'
  | 'SELECT_MULTIPLE'
  | 'CHECKBOX'
  | 'DATE'
  | 'TIME'
  | 'DATETIME'
  | 'PHOTO'
  | 'VIDEO'
  | 'SIGNATURE'
  | 'LOCATION'
  | 'SLIDER'
  | 'FILE'
  | 'ANNOTATION';

// Inspection Types
export interface Inspection {
  id: string;
  title?: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  score?: number;
  maxScore?: number;
  percentage?: number;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  template: Template;
  conductor: User;
  answers: Answer[];
}

export interface Answer {
  id: string;
  value?: string;
  score?: number;
  sectionInstance: number;
  question: Question;
  option?: Option;
  files: File[];
}

// Form Builder Types
export interface FormBuilderQuestion {
  id: string;
  text: string;
  type: QuestionType;
  isRequired: boolean;
  options?: FormBuilderOption[];
  validationRules?: any;
}

export interface FormBuilderOption {
  id: string;
  text: string;
  value: string;
  score?: number;
}

export interface FormBuilderSection {
  id: string;
  title: string;
  isRepeatable: boolean;
  questions: FormBuilderQuestion[];
}

export interface FormBuilderPage {
  id: string;
  title: string;
  sections: FormBuilderSection[];
}